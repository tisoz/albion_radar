
#include "npcap_session.h"
#include <winsock2.h>
static void init_npcap_dll_path(napi_env env)
{
	BOOL(WINAPI *SetDllDirectory)(LPCTSTR);
	char sysdir_name[512];
	int len;

	SetDllDirectory = (BOOL(WINAPI *)(LPCTSTR)) GetProcAddress(GetModuleHandle("kernel32.dll"), "SetDllDirectoryA");
	if (SetDllDirectory == NULL) {
        Napi::TypeError::New(env, "Error in SetDllDirectory").ThrowAsJavaScriptException();
	}
	else {
		len = GetSystemDirectory(sysdir_name, 480);	//	be safe
		if (!len)
            Napi::TypeError::New(env, "Error in GetSystemDirectory").ThrowAsJavaScriptException();
			// error("Error in GetSystemDirectory (%d)", GetLastError());
		strcat(sysdir_name, "\\Npcap");
		if (SetDllDirectory(sysdir_name) == 0)
            Napi::TypeError::New(env, "Error in SetDllDirectory(\"System32\\Npcap\")").ThrowAsJavaScriptException();
	}
}

// Helper method, convert a sockaddr* (AF_INET or AF_INET6) to a string, and set it as the property
// named 'key' in the Address object you pass in.
static void SetAddrStringHelper(const char* key, sockaddr *addr,napi_env env, Napi::Object  Address){
  if(key && addr){
    char dst_addr[INET6_ADDRSTRLEN + 1] = {0};
    char* src = 0;
    socklen_t size = 0;
    if(addr->sa_family == AF_INET){
      struct sockaddr_in* saddr = (struct sockaddr_in*) addr;
      src = (char*) &(saddr->sin_addr);
      size = INET_ADDRSTRLEN;
    }else{
      struct sockaddr_in6* saddr6 = (struct sockaddr_in6*) addr;
      src = (char*) &(saddr6->sin6_addr);
      size = INET6_ADDRSTRLEN;
    }
    const char* address = inet_ntop(addr->sa_family, src, dst_addr, size);
    if(address){
        Address.Set(key,Napi::String::New(env,address));
    }
  }
}

Napi::String DefaultDevice(const Napi::CallbackInfo& info){
    char errbuf[PCAP_ERRBUF_SIZE];
    // Look up the first device with an address, pcap_lookupdev() just returns the first non-loopback device.
    pcap_if_t *alldevs, *dev;
    pcap_addr_t *addr;
    bool found = false;
    Napi::String devName;

    
    if (pcap_findalldevs(&alldevs, errbuf) == -1) {
        Napi::TypeError::New(info.Env(), errbuf).ThrowAsJavaScriptException();
        return Napi::String::New(info.Env(),errbuf);
    }

    if (alldevs == NULL) {
        Napi::TypeError::New(info.Env(), "pcap_findalldevs didn't find any devs").ThrowAsJavaScriptException();
        return Napi::String::New(info.Env(),"pcap_findalldevs didn't find any devs");
    }

    for (dev = alldevs; dev != NULL; dev = dev->next) {
        if (dev->addresses != NULL && !(dev->flags & PCAP_IF_LOOPBACK)) {
            for (addr = dev->addresses; addr != NULL; addr = addr->next) {
                // TODO - include IPv6 addresses in DefaultDevice guess
                // if (addr->addr->sa_family == AF_INET || addr->addr->sa_family == AF_INET6) {
                if (addr->addr->sa_family == AF_INET) {
                    devName=Napi::String::New(info.Env(),dev->name);
                    found = true;
                    break;
                }
            }

            if (found) {
                break;
            }
        }
    }

    pcap_freealldevs(alldevs);
    return devName;
}

Napi::Array FindAllDevs(const Napi::CallbackInfo& info){
    char errbuf[PCAP_ERRBUF_SIZE];
    pcap_if_t *alldevs, *cur_dev;

    Napi::Array DevsArray=Napi::Array::New(info.Env());


    if (pcap_findalldevs(&alldevs, errbuf) == -1 || alldevs == NULL) {
        Napi::TypeError::New(info.Env(), errbuf).ThrowAsJavaScriptException();
        return DevsArray;
    }

    

    int i = 0;
    for (cur_dev = alldevs ; cur_dev != NULL ; cur_dev = cur_dev->next, i++) {
        Napi::Object Dev = Napi::Object::New(info.Env());
        

        Dev.Set("name",Napi::String::New(info.Env(),cur_dev->name));
        if (cur_dev->description != NULL) {
            Dev.Set("description",Napi::String::New(info.Env(),cur_dev->description));
        }
        Napi::Array AddrArray = Napi::Array::New(info.Env());
        int j = 0;
        for (pcap_addr_t *cur_addr = cur_dev->addresses ; cur_addr != NULL ; cur_addr = cur_addr->next, j++) {
          if (cur_addr->addr){
              int af = cur_addr->addr->sa_family;
              if(af == AF_INET || af == AF_INET6){
                Napi::Object Address = Napi::Object::New(info.Env());
                SetAddrStringHelper("addr", cur_addr->addr,info.Env(), Address);
                SetAddrStringHelper("netmask", cur_addr->netmask,info.Env(), Address);
                SetAddrStringHelper("broadaddr", cur_addr->broadaddr, info.Env(), Address);
                SetAddrStringHelper("dstaddr", cur_addr->dstaddr, info.Env(), Address);
                AddrArray[j]=Address;
              }
           }
        }
        Dev.Set("addresses",AddrArray);

        if (cur_dev->flags & PCAP_IF_LOOPBACK) {
            Dev.Set("flags",Napi::String::New(info.Env(),"PCAP_IF_LOOPBACK"));
        }
        DevsArray[i]=Dev;
    }

    pcap_freealldevs(alldevs);

    return DevsArray;
}

Napi::String LibVersion(const Napi::CallbackInfo& info){
    return Napi::String::New(info.Env(),pcap_lib_version());
}


Napi::Object Init(Napi::Env env, Napi::Object exports) {
  init_npcap_dll_path(env);
  PcapSession::Init(env,exports);
  exports.Set(Napi::String::New(env, "lib_version"),Napi::Function::New(env, LibVersion));
  exports.Set(Napi::String::New(env, "default_device"),Napi::Function::New(env, DefaultDevice));
  exports.Set(Napi::String::New(env, "findalldevs"),Napi::Function::New(env, FindAllDevs));
  return exports;
}

NODE_API_MODULE(pcap_binding, Init)