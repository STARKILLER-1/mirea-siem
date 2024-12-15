import socket
from scapy.all import ARP, Ether, srp


def scan_local_network(interface="eth0"):
    arp_request = Ether(dst="ff:ff:ff:ff:ff:ff") / ARP(pdst="192.168.24.0/24")
    answered, unanswered = srp(arp_request, timeout=2, iface=interface, verbose=False)
    result = []
    for sent, received in answered:
        result.append({'ip': received.psrc, 'mac': received.hwsrc})

    return result


def check_ssh_port(ip):
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(1)
        result = sock.connect_ex((ip, 22))
        sock.close()
        if result == 0:
            return True
        else:
            return False
    except Exception as e:
        print(f"Ошибка при проверке порта SSH для {ip}: {e}")
        return False


if __name__ == "__main__":
    interface = "vmnet8"
    hosts = scan_local_network(interface)

    print("Обнаруженные хосты с открытым портом SSH (порт 22):")
    for host in hosts:
        if check_ssh_port(host['ip']):
            print(f"IP: {host['ip']}, MAC: {host['mac']}")
