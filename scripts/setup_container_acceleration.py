import os

def install_nvidia_container_toolkit():
    os.system("curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey | sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg \
                && curl -s -L https://nvidia.github.io/libnvidia-container/stable/deb/nvidia-container-toolkit.list | \
                sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' | \
                sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list")

    os.system("sed -i -e '/experimental/ s/^#//g' /etc/apt/sources.list.d/nvidia-container-toolkit.list")

    os.system("sudo apt-get update")

    os.system("sudo apt-get install -y nvidia-container-toolkit")

if __name__ == "__main__":
    if os.name != 'posix':
        print("This script only runs on Linux.")
    else:
        install_nvidia_container_toolkit()
