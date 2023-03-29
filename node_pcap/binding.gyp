{
  "targets": [
    {
      "target_name": "pcap_binding",
      'win_delay_load_hook': 'true',
      "sources": [ "npcap_binding.cpp","npcap_session.cpp"],
      "include_dirs": ["npcap/Include","<!@(node -p \"require('node-addon-api').include\")"],
      "libraries": [
        "<(module_root_dir)/npcap/Lib/x64/Packet.lib",
        "<(module_root_dir)/npcap/Lib/x64/wpcap.lib",
        "Ws2_32.lib"
      ],
      'defines': [ 'NAPI_DISABLE_CPP_EXCEPTIONS','NAPI_EXPERIMENTAL'],
      'target_conditions': [
        ['_win_delay_load_hook=="true"', {
          # If the addon specifies `'win_delay_load_hook': 'true'` in its
          # binding.gyp, link a delay-load hook into the DLL. This hook ensures
          # that the addon will work regardless of whether the node/iojs binary
          # is named node.exe, iojs.exe, or something else.
          'conditions': [
            [ 'OS=="win"', {
              'defines': [ 'HOST_BINARY=\"<(node_host_binary)<(EXECUTABLE_SUFFIX)\"', ],
              'sources': [
                '<(node_gyp_dir)/src/win_delay_load_hook.cc',
              ],
              'msvs_settings': {
                'VCLinkerTool': {
                  'DelayLoadDLLs': [ '<(node_host_binary)<(EXECUTABLE_SUFFIX)','wpcap.dll' ],
                  # Don't print a linker warning when no imports from either .exe
                  # are used.
                  'AdditionalOptions': [ '/ignore:4199' ],
                },
              },
            }],
          ],
        }],
      ],
    }
  ]
}
