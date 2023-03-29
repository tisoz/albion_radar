#ifndef NPCAP_SESSION_H
#define NPCAP_SESSION_H
#define NAPI_VERSION 6
#include <napi.h>
#include <pcap/pcap.h>
#include "stdio.h"

#if 0
class PcapWorker : public Napi::AsyncWorker {
    public:
        PcapWorker(Napi::Function& callback)
        : Napi::AsyncWorker(callback) {}

        ~PcapWorker() {}
    // This code will be executed on the worker thread
    void Execute() override {
        // Need to simulate cpu heavy task
        // std::this_thread::sleep_for(std::chrono::seconds(1));
        printf("excute\r\n");
    }

    // void OnOK() override {
    //     Napi::HandleScope scope(Env());
    //     Callback().Call({Env().Null()});
    // }

    private:
        
};
#endif


class PcapSession : public Napi::ObjectWrap<PcapSession>{
 public:
  static Napi::Object Init(Napi::Env env, Napi::Object exports);
  PcapSession(const Napi::CallbackInfo& info);

 private:
  static Napi::FunctionReference constructor;

  Napi::Value PcapSession::New(const Napi::CallbackInfo& info);
  Napi::Value PcapSession::Open(bool,const Napi::CallbackInfo& info);
  Napi::Value PcapSession::OpenLive(const Napi::CallbackInfo& info);
  Napi::Value PcapSession::OpenOffline(const Napi::CallbackInfo& info);
  Napi::Value PcapSession::LoadBuffer(const Napi::CallbackInfo& info);
  Napi::Value PcapSession::Close(const Napi::CallbackInfo& info);
  Napi::Value PcapSession::Stats(const Napi::CallbackInfo& info);
  Napi::Value PcapSession::Inject(const Napi::CallbackInfo& info);
  
  static DWORD WINAPI PacketThread(LPVOID lpParam);


  pcap_t * session;
  Napi::ThreadSafeFunction  tsFn;
  HANDLE rThread;

  struct bpf_program fp;
  bpf_u_int32 mask;
  bpf_u_int32 net;
  pcap_t *pcap_handle;
  pcap_dumper_t *pcap_dump_handle;
  char *buffer_data;
  size_t buffer_length;
  size_t snap_length;
  char *header_data;

  bool opened=false;
};

#endif