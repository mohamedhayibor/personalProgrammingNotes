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

8/12
----------

RPC: Remote Procedure Call: when a computer causes a procedure (subroutine) to exectute in another address space (another computer on a shared network) which is coded as if it were a normal (local) procedure call, without the programmer explicitely coding the details for the remote interaction. (the programmer writes essentially the same code whether the subroutine is local to the executing program, or remote).

> RPCs are a form of IPC (inter-process communication).

Aho-Corasick algorithm: a string searching algorithm O(n)

notes from futures rs
------------------------
Future: represents a value that might not be available in the future but might be at some point in the future. (Becomes complete due to an event happening somewhere else).
Reasons of using them:

1. database query: executing in a thread pool. (when the query finishes, the query is completed and it true value is the result of the query.)

2. RPC invocation: Wnen the server replies the future is completed and its value is the server's response.

3. Timeout: when the time is up, the future is completed (value of "()" rust's basic value)

4. A long-running CPU intense task: (running on a thread pool), its value is the return value of the task.

5. Reading bytes from a socket: when the bytes are ready, the future is completed.

> Futures are applicable to asynchronous events of all shapes and sizes.

8/15
-------

OTR: off the record messaging, a cryptographic protocol that provides encryption for instant messaging conversations (provides forward secrecy and malleable encryption.

SSID: a case sensitive, 32 alphanumeric character unique identifier attached to the header of packets sent over a wireless local area network (wlan).

Opsec: operations security.

8/16
----------

service set: a set consisting of all devices associated with a consumer or enterprise  (WLAN).

BSSID (Basic Service Set Identification): a 48 bit identity used to identify a particular BSS (Basic Service Set) within an area. In infrastructure BSS networks, it is the MAC address of the access point (AP) and in independent BSS or adhoc networks, the BSSID is randomly generated.

SSID: Service Set ID.

Network cloaking: an attempt to provide wireless security by hiding the network name (SSID) from being broadcasted to the public.

OTPW: One time password: developed for authentification in unix-like operating systems. A series of one-time passwords is created from a short set of characters and a set of one-time tokens.

RSSI: received signal strength indicator: a measurement of power present in a received radio signal.

RTS/CTS (request to Send / clear to send) used by networking protocol to reduce frame collisions.

bcrypt: a password hashing function:

* incorporates a salt to protect against rainbow table attacks.
* adaptive function.
* resistant to brute force search attacks even with increased computing power.

Notes from High Performance Browswer Networking:
-----

WPO: (web performance optimization)

Latency: the time it takes from the source sending the packet to the destination receiving it.

Bandwidth: throughput of logical or physical communication path.

common contributing components in latency (typical router):

- propagation delay: time it takes for amessage to travel from sender to receiver (function of distance / time)
- Transmission delay: time it takes to push all packets bits to the link (function of packet length and data rate)
- processing delay: required time to process the packet header (checking for bit level errors and determining the packet's destination)
- queueing delay: time a packet is on a queue before getting processed.

Traceroute: a simple networking tool for identifying the routing path of the packet and the latency of each network hop in an IP network.


Flow control is a mechanism to prevent sender from overwhelming the receiver with data that it may not be able to process.

slow-start restart (SSR) mechanism: resets the congestion, the window is reset to a "safe" default.

TCP uses packet loss as a feedback mechanism to help regulate its performance.

Bandwidth-delay product (BDP): Product of link's capacity and its end-to-end delay.

TCP is an adaptive protocol designed to be fair to all network peers and make the most efficient use of the underlying network.

> The best way to optimize TCP is to tune how TCP senses the current network conditions and adapts its behavior based on the type and the requirements of the layers below and above it.



> TCP connection reuse is critical to improve performance


Performance: eliminating unecessary data transfers (n.1), eliminating unecessary resources or ensuring that the minimum number of bits is transferred by applying the appropriate compression algorithm.

Locating the bits closer: (reduce latency of network roundtrips and significantly improve TCP performance.

1. geo-distributing servers around the world.
2. using a CDN




##### Building blocks of UDP:

User Datagram Protocol (UDP): (null protocol): a self contained, independent entity of data carrying efficient information to be routed from the source to the destination nodes and the transporting network.

NAT: Network Address Translator: an interim solution to resolve the looming IPv4 address depletion problem (not being able to allocate a unique IP to every host.)

> Solution: introduction of Nat devices at the edge of the network, each of which would be responsible for maintaining a table mapping of local IP and port tuples to one or more globally unique (public) IP and port tuples.

Session Traversal Utilities (STUN): a protocol that allows the host application to discover the presence of a network address translator on the network and when present to obtain the allocated public IP and port tuple for the current connection.

#### TLS

A secure web application will leverage all 3 service:
1. Encryption: to obfuscate what is sent from one host to another.
2. Authentication: mechanism to verify the validity of provided identification material.
3. Integrity: mechanism to detect message tampering and forgery.

asymmetric key cryptography == public key cryptography: allows the peers to negotiate a shared secret key without having to establish any prior knowledge to each other (over an unencrypted channel).

Unencrypted communication via HTTP: creates a large number of privacy, security and integrity vulnerabilities:

- Interception
- manipulation
- impersonation
- users credentials
- history
- identity
- other sensitive information

Ways to optimize:

1. Optimizing connection reuse
2. Leverage Early termination
3. Enable HTTP Strict Transport Security (HSTS)
3. Enable HTTP Public key Pinning (HPKP)
4. Update site content to HTTPS

Public key pinning enables a site to send an HTTP header that instructs the browser to remember ("pin") one or more certificates in its certificate chain. (ability to scope which certificates, or issuers, should be accepted by the browser on subsequent visits.


#### Introduction to wireless networks

Channel capacity: the maximum information rate

C = BW * log2(1 + S/N) 

* BW: available bandwidth
* S: signal
* N: noise

factors that affect the performance of wireless networks:

1. distance between receiver and sender
2. background noise in current location
3. interference from users in the same network
4. interference from users in other nearby network
5. available transmit power, both a receiver and sender
6. processing power and the chosen modulation scheme

#### Websocket protocol

Consists of two high-level components:

1. the opening HTTP handshake used to negotiate the parameters of the connection.
2. a binary message framing mechanism to allow for a low overhead, message-based delivery of both text and binary data.
