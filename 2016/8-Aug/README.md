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

8/4 Notes from Software defined networks:
-----

computer networks divided in:

1. data
2. control
3. management planes

Data plane represents the protocols used to populate the forwarding tables of the data plane elements.

forward abstraction: allowing any forwarding behavior desired by the network.application.

specification: allowing a network application to express the desired network behavior without being responsible for implementing that behavior.

Network applications: Mac learning - Routing algorithms - Instrusion Detection System- Load balancer.

iptables: a user-space application program that allows a system admin to configure the tables provided by the linux kernel firewall and the chains and rules it stores.

a binary protocol: is expected to be read by a machine rather than a human being as opposed to SMTP, IRC, HTTP.

8/5
---

SSH (Secure Shell): a cryptographic network protocol for operating network services securely over an untrusted network. Common applications: remote command line login, uses public-key cryptography to authenticate.

Cookie injection attack (Session hijacking attack): can be mounted during a man-in-the-middle attack who set cookies throughout their invasive session.

8/6
-----
Steps from a simple HTTP Transaction:

1. DNS lookup
2. Connect
3. Send
4. Wait
5. Load

![](http://res.cloudinary.com/masteryoperation/image/upload/v1470511302/Screen_Shot_2016-08-06_at_3.21.16_PM_bdquvv.png)

[source](http://blog.catchpoint.com/2010/09/17/anatomyhttp/)

[Good mkt read: How to sell golden hammers](http://c2.com/cgi/wiki?HowToSellGoldenHammers)

8/8
--------
Mac addresses are the low-level basics that make your ethernet based network work.

> Each network card has a mac address. If a network adapter is receiving a packet, it is comparing the packet's destination mac address and its own, if they don't match the packet is discarded.

There are special mac addresses.ie: "ff:ff:ff:ff:ff:ff": is the broadcast address and addresses every network adapter in the network.

Ip is a protocol that is used on a layer above the ethernet.

Since ethernet uses MAC addresses, the sender needs to get the MAC address at the next hop. That's where ARP (address resolution protocol) comes in. Once the sender has retrieved the MAC address of the next hop, he writes that target MAC address into the packet and sends the packet.

Use cases for mac addresses:

1. Network switches store a list of MAC addresses seen at every port and only forward packets to the ports that need to see the packet.

2. Wireless access points often use MAC addresses for access control.

3. DHCP servers use the mac address to identify devices and give some devices fixed IP addresses.

[Source: How to geek](http://www.howtogeek.com/169540/what-exactly-is-a-mac-address-used-for/)

8/9
-----

Generic Routing encapsulation (GRE): is a tunnelling protocol (developed by cisco) that can enacapsulate a wide variety of network layer protocols inside virtual point to point links over internet protocol network. (Internet protocol 47)

###### Packets idioms:

Timestamp help in determining which order packets were sent

MSS: the maximum segment size, largest amount of data specified

window scale: the TCP window scale option: is an option used to increase the maximum window size from 65,535 bytes to 1gigabytes

Selective Acknowlegement: SACK option, allows the receiver to acknowledge discountinous blocks of packets which were received correctly. This option enables use of SACK during negotiation. The acknowledgement can specify a number of SACK blocks, where each SACK block is conveyed by the starting and ending sequence number of contiguous range that the receiver correctly received.

8/10
---------

Juice Jacking: a cyber attack where a malware is installed or data copied when charging a phone, tablet, or other computer device on public wall charger or kiosks.
