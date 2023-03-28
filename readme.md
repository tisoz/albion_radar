**免责声明:**
在v2和v3之间有一些API更改；createSession和createOfflineSession的参数现在接受一个options对象。此外，如果您正在监视wifi接口，Radiotap标头现在具有不同的字段。

---

node_pcap
=========

这是一组从libpcap到节点的绑定，以及一些用于解码、打印和分析数据包的有用库。libpcap是一个由tcpdump和wireshark等程序使用的数据包捕获库。它已在OSX和Linux上进行了测试。

node_pcap对许多事情都很有用，但它尚未理解所有常见协议

## 为什么要在JavaScript中捕获数据包？

已经有很多用于捕获、解码和分析数据包的工具。许多工具经过了彻底的测试并且非常快。那么，为什么还有人想在JavaScript中进行如此低级别的操作，如数据包捕获和分析呢？有以下几个原因：

* JavaScript让编写基于事件的程序变得非常自然。捕获到的每个数据包都会生成一个事件，当解码高级协议时，它们也可能会生成事件。使用匿名函数和闭包处理这些事件要容易得多，也更具可读性。

* 借助其Buffer类，Node.js使JavaScript中的二进制数据处理变得快速高效。解码数据包涉及大量的二进制切片操作，这在JavaScript字符串中可能会变得很尴尬。

* 在Node.js中编写捕获数据包、对其进行某种处理，然后以某种方式提供处理后数据的服务器非常简单。

* Node具有非常出色的HTTP解析器，用于逐步解码HTTP会话。

## 安装

您需要安装libpcap。大多数OSX机器似乎都已经安装了它。所有主要的Linux发行版都提供了它，可以通过默认安装或者类似于libpcap-dev的软件包安装。

获取node_pcap及其工具的最简单方法是使用npm：

```angular2html
npm install pcap
```

如果您想要对源代码进行修改，可以从github获取它。像这样克隆该存储库：

```angular2html
git clone git://github.com/node-pcap/node_pcap.git
```

要编译本地代码绑定，请执行以下操作：

```angular2html
cd node_pcap
node-gyp configure build
```

假设它没有错误地构建，您应该能够运行示例，然后编写自己的数据包捕获程序。

## 使用

有几个示例程序展示了如何使用node_pcap。这些示例是最好的文档。请尝试运行它们并查看它们的功能。

### 启动捕获会话

要启动捕获会话，请使用接口名称和pcap过滤器字符串调用pcap.createSession：

```javascript
var pcap = require('pcap'),
    pcap_session = pcap.createSession(device_name, options);
```

`device_name`是要捕获数据包的网络接口的名称。如果传递了一个空字符串，`libpcap`将尝试选择一个“默认”接口，通常只是某个列表中的第一个接口，而不是您想要的接口。

options对象接受以下属性：

- `filter`（字符串）是一个pcap过滤表达式，有关更多信息，请参见pcap-filter（7）。（默认值：无过滤器，将捕获接口上可见的所有数据包）

- `promiscuous`（布尔值）指定接口是否以混杂模式打开（默认值：true）

  > 在广播LAN（例如以太网）上，如果网络未进行交换，或者如果适配器连接到交换机上的“镜像端口”，交换机将发送通过交换机的所有数据包，网络适配器将接收LAN上的所有数据包，包括未发送到网络地址的单播或组播包，该网络适配器未配置为识别。
  > 通常，适配器将丢弃这些数据包；但是，许多网络适配器支持“混杂模式”，这是一种模式，其中提供给主机所有数据包，即使它们未发送到适配器识别的地址。这对于被动捕获两个或多个其他主机之间的流量进行分析很有用。
  > 请注意，即使应用程序未设置混杂模式，适配器也可能出于某种其他原因处于混杂模式。
  > 目前，这在“any”设备上不起作用；如果提供了“any”或NULL参数，则忽略混杂模式设置。

- `buffer_size`（数字）指定环形缓冲区的大小，数据包存储在其中，直到传递给您的代码为止，以字节为单位（默认值：10MB）

  > 捕获到的数据包存储在缓冲区中，以便它们不必在到达时立即由应用程序读取。在某些平台上，可以设置缓冲区的大小；如果大小过小，则可能意味着如果捕获过多的数据包并且快照长度不限制缓冲的数据量，则在应用程序可以从中读取数据包之前，如果缓冲区填满，则可能会丢弃数据包；如果大小过大，则可能使用比必要的更多的不可分页操作系统内存以防止数据包丢失。


- `buffer_timeout` （数字）指定数据包缓冲区超时时间，以毫秒为单位（默认值：1000）
  > 如果在捕获数据包时，数据包一到达就立即传递，那么捕获数据包的应用程序将在每个数据包到达时被唤醒，并可能需要多次调用操作系统来获取每个数据包。
  
  > 相反，如果数据包未在到达时立即传递，而是在短暂延迟后传递（称为“数据包缓冲区超时”），则在数据包传递之前可以累积多个数据包，以便为多个数据包执行单个唤醒，并且对操作系统所做的每组调用会提供多个数据包，而不是一个数据包。如果数据包以高速率到达，则减少每个数据包的CPU开销，从而增加可以捕获的每秒数据包数。
  
  > 数据包缓冲区超时是必需的，以便应用程序在数据包传递之前不会等待操作系统的捕获缓冲区填满；如果数据包到达缓慢，则等待可能需要任意长的时间。
  
  > 并非所有平台都支持数据包缓冲区超时；在不支持数据包缓冲区超时的平台上，将忽略数据包缓冲区超时。在支持数据包缓冲区超时的平台上，超时时间为零会导致读取永久等待，以允许足够的数据包到达，而没有超时。负值无效；将超时设置为负值的结果是不可预测的。
 
   > **注意：**数据包缓冲区超时不能用于在有限时间内导致读取数据包的调用返回，因为在某些平台上，不支持数据包缓冲区超时，在其他平台上，计时器不会在至少有一个数据包到达之前开始计时。这意味着，在交互式应用程序中，不应使用数据包缓冲区超时来允许数据包捕获循环定期“轮询”用户输入，因为即使没有数据包到达，读取数据包的调用也不能保证在超时到期后返回。

  如果设置为零或负值，则启用立即模式：

  > 在立即模式下，数据包总是在到达时立即传递，没有缓冲。

- `monitor` （布尔值）指定是否启用监控模式（默认值：false）

  > 在IEEE 802.11无线局域网上，即使适配器处于混杂模式，它也只会向主机提供与其关联的网络的帧。它可能只提供数据帧，而不是管理或控制帧，并且可能不会为这些帧提供802.11标头或无线电信息伪标头
  >
  > 在“监控模式”下，有时也称为“rfmon模式”（用于“无线电频率监视器”），适配器将提供其接收到的所有帧，带有802.11标头，并可能提供有关帧的无线电信息的伪标头。
  >
  > 请注意，在监视模式下，适配器可能会与其关联的网络取消关联，因此您将无法使用该适配器的任何无线网络。如果您在监视模式下捕获并且未连接到具有另一个适配器的另一个网络，则可能无法访问网络服务器上的文件或解析主机名或网络地址。

- `snap_length` （数字）指定快照长度，以字节为单位（默认值：65535）

  > 如果在捕获时捕获了数据包的全部内容，则需要更多的CPU时间将数据包复制到您的应用程序，更多的磁盘和可能的网络带宽将数据包数据写入文件，以及更多的磁盘空间保存数据包。如果您不需要数据包的全部内容-例如，如果您只对数据包的TCP头感兴趣-则可以将捕获的“快照长度”设置为适当的值。如果将快照长度设置为snaplen，并且snaplen小于捕获的数据包的大小，则只捕获该数据包的前snaplen个字节并提供作为数据包数据。
  >
  > 在大多数情况下，将快照长度设置为65535应该足够捕获数据包中的所有数据。

请注意，默认情况下，`node_pcap`在混杂模式下打开接口，这通常需要以root身份运行。除非您已经以root身份漫游，否则您可能需要像这样启动您的node程序：
```angular2html
sudo node test.js
```

### 监听数据包

`pcap_session` 是一个 `EventEmitter`，它会触发 `packet` 事件。回调函数的唯一参数是一个包含由 `libpcap` 返回的原始字节的 `PacketWithHeader` 对象：

```javascript
pcap_session.on('packet', function (raw_packet) {
    // 处理原始数据包
});
``` 


`raw_packet` 包含 `buf` 和 `header` (`Buffer`s) 以及 `link_type`。

为了将 `raw_packet` 转换成易于处理的 JavaScript 对象，请进行解码：

```javascript
var packet = pcap.decode.packet(raw_packet);
``` 

协议栈是作为一组嵌套的对象公开的。例如，TCP 目标端口是 TCP 的一部分，它被封装在 IP 中，而 IP 又被封装在链路层中。每一层都包含在上一层（或数据包本身）的 `payload` 属性中：

```javascript
packet.payload.payload.payload.dport
```

利用 `util.inspect` 可以轻松地探索这个结构。

然而，如果您决定自己解析 `raw_packet.buf`，请确保首先将其截断为前 `caplen` 个字节。
### TCP 分析

可以通过将数据包输入到 `TCPTracker` 中并监听 `session` 和 `end` 事件来分析 TCP。

```javascript
var pcap = require('pcap'),
    tcp_tracker = new pcap.TCPTracker(),
    pcap_session = pcap.createSession('en0', {filter: "ip proto \\tcp"});

tcp_tracker.on('session', function (session) {
    console.log("Start of session between " + session.src_name + " and " + session.dst_name);
    session.on('end', function (session) {
        console.log("End of TCP session between " + session.src_name + " and " + session.dst_name);
    });
});

pcap_session.on('packet', function (raw_packet) {
    var packet = pcap.decode.packet(raw_packet);
    tcp_tracker.track_packet(packet);
});
``` 


您必须仅向 TCP 跟踪器发送 IPv4 TCP 数据包。使用 `sys.inspect` 探索 `session` 对象，看看它可以为您做什么美妙的事情。希望属性名称是不言自明的：

参见 [http_trace](https://github.com/mranney/http_trace) 来了解如何使用这些事件来解码 HTTP（仅适用于 Node 4）。

### 其他操作

要了解链路层头的格式，请使用 `pcap_session.link_type` 或 `raw_packet.link_type`。该属性是一个 `LINKTYPE_<...>` 字符串，请参见[此列表](https://www.tcpdump.org/linktypes.html)。

要获取当前的捕获统计信息，请使用 `pcap_session.stats()`。它返回一个对象，包含以下属性：

- `ps_recv`：收到的数据包数
- `ps_ifdrop`：被网络接口或其驱动程序丢弃的数据包数
- `ps_drop`：因操作系统缓冲区中没有足够的空间而在到达时被丢弃的数据包数，因为数据包没有被足够快地读取

更多信息，请参阅[`pcap_stats`](https://www.tcpdump.org/manpages/pcap_stats.3pcap.html)。

如果您不再需要接收数据包，可以使用 `pcap_session.close()`。

要从文件而非实时接口读取数据包，请使用 `createOfflineSession` 替代：

```javascript
pcap.createOfflineSession('/path/to/capture.pcap', options);
```
在 `options` 中只接受 `filter` 属性。

## 一些常见问题

### TCP分段卸载 - TSO

TSO是现代操作系统用于卸载IP / TCP头计算负担到网络硬件的技术。它还减少了数据在内核和网络硬件之间移动的次数。当发送大于单个IP数据包的数据时，TSO可以节省CPU资源。

这是非常棒和出色的，但它确实使某些类型的数据包嗅探更加困难。在许多情况下，看到确切发送的数据包很重要，但如果网络硬件正在发送数据包，则这些数据包对 `libpcap` 不可用。解决方案是禁用TSO。
OSX:

    sudo sysctl -w net.inet.tcp.tso=0

Linux（替换正确的接口名称）：

    sudo ethtool -K eth0 tso off

需要禁用TSO的症状是类似于“接收到我们没有看到被发送的数据包的ACK”的消息。

### IPv6

遗憾的是， `node_pcap` 尚不知道如何解码IPv6数据包。通常在捕获流量到 `localhost` 时，IPv6流量会出现意外，
即使您期望的是IPv4。一个常见情况是主机名 `localhost`，许多客户端程序将其解析为IPv6地址 `::1` ，然后尝试 `127.0.0.1`。在我们获得IPv6解码支持之前，
`libpcap` 过滤器可以设置为只查看IPv4流量：

    sudo http_trace lo0 "ip proto \tcp"

反斜杠很重要。 pcap过滤器语言与单词 "tcp" 有一个模棱两可的问题，因此通过转义它，您将获得此情况的正确解释。
### 丢失数据包

在捕获数据包时，涉及到几个级别的缓冲。有时这些缓冲区会填满，从而导致丢失数据包。如果发生这种情况，就很难重建更高层的协议。保持缓冲区不填满的最佳方法是使用 pcap 过滤器仅考虑您需要解码的流量。 pcap 过滤器非常高效，可以在接近内核的位置运行，从而可以处理高速数据包率。

如果 pcap 过滤器已正确设置，并且 `libpcap` 仍然会丢失数据包，则可以增加 `bufferSize` 选项。如上所示，您可以使用 `pcap_session.stats()` 检查是否有数据包丢失。

### 处理警告

libpcap有时会发出警告（例如，当接口没有地址时）。默认情况下，这些警告会打印到控制台上，但是您可以使用自己的函数覆盖警告处理程序：

```js
pcap.warningHandler = function (text) {
    // ...
}
```

## 示例

[redis_trace](https://github.com/mranney/redis_trace)

[http_trace](https://github.com/mranney/http_trace) （仅适用于Node 4）
