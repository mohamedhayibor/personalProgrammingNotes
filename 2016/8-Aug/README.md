8/1 (challenge of this month: learn about mesh networking - publish a bunch of crates)
--------

Electromagnetic forces are the forces between electrical charges and currents.

1. electrical force: the force between electrical charges.
2. magnetic force: force between electrical charges.

> whenever electrical charges are moving, they induce a magnetic field.

> electro-magnetic waves differ from mechanical waves in that they require no medium to propagate.

Rules of thumb when making first plans for a wireless network:

* The longer the wavelength, the further it goes
* The longer the wavelength, the better it travels through and around things
* The shorter the wavelength, the more data it can transport

> Lower frequency transmitters tend to reach much greater distances than high frequency transmitters at the same power.

multisplash effects: signal reaching their target along different paths and therefore at different times.

Mesh networks are based on multipoint-to-multipoint (m2m) networking.

Mesh networks extends the range of wireless devices by multi-hop relaying traffic.

> In public, semi public network settings, encryption techniques such as WEP, WPA are effectively useless. No way to distribute public or shared keys to members of the general public without compromising the security of those keys.

8/2
-----
SockAddr (rust-lang) is used to assign an ipv4 or ipv6 address

ToSocketAddrs is used to connect to a port

UDP: a simple connectionless transmission protocol with a minimum of protocol mechanism. (no handshakes dialogues)

* transaction-oriented: DNS - Network Time Protocol
* datagrams: ip tunnelling, remote procedure protocol, network file system

epoll: a linux kernel system call, (scalable IO event notification mechanism. It's function is to monitor multiple file descriptors to see whether IO is possible on any of them.

Kqueue: provides efficient IO event pipelines between the kernel and userland. (not only handles file descriptor events but also for other notifications such as: file modification monitoring, signals, async IO, child process,

Buffer: an abstraction around byte storage.
