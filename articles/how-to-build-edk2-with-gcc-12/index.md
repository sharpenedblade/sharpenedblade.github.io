---
title: How to build EDK2 with GCC 12
date: 2023-04-16
description: How to build tianocore on a modern linux system.
---

EDK2 (tianocore) is a UEFI reference implementation that is almost entirely FOSS. Sadly, the documentation is *lacking*, and building it on modern systems took a lot of trial and error. The easiest method was to use a Ubuntu 16.06 container, but the new build system was fully adopted a few months ago. This made it much easier to build, although the docs are still wrong in a few places. After looking at the new CI code, I managed to get a working build on a fresh Fedora 37 install.

## Setting Up the Build Environment

There are two main ways to get the required dependencies, you can either use a pre-built Fedora or Ubuntu container from tianocore, or you can install the dependencies manually. Installing the dependencies manually gives you more freedom, but the container is easier to use and is supported by tianocore.

### Using the official container

Tianocore provides a container with the required dependencies already installed. Run the container with podman:
```bash
podman run -it --name edk2-build -v ~/:/root/ ghcr.io/tianocore/containers/fedora-37-build:latest
```

### Using a normal Fedora system

1.  Install dependencies with DNF:
    ```bash
    dnf install acpica-tools dotnet-runtime-6.0 curl gcc-c++ gcc lcov libX11-devel libXext-devel libuuid-devel make nuget nasm python3 python3-distutils-extra python3-pip python3-setuptools nodejs npm
    ```

2.  If you are cross-compiling, run:
    ```bash
    dnf install gcc-aarch64-linux-gnu gcc-arm-linux-gnu gcc-riscv64-linux-gnu
    export GCC5_AARCH64_PREFIX="/usr/bin/aarch64-linux-gnu-"
    export GCC5_ARM_PREFIX="/usr/bin/arm-linux-gnu-"
    export GCC5_RISCV64_PREFIX="/usr/bin/riscv64-linux-gnu-"
    ```

## Setting up EDK2

1.  Clone the repo:  
    ```bash
    git clone https://github.com/tianocore/edk2 && cd edk2
    git submodule update --init --recursive
    ```

2.  Build the base tools:
    ```bash
    make -C BaseTools
    ```

3.  Create and enter a venv:
    ```bash
    python3 -m venv .venv
    source .venv/bin/activate
    ```

4.  Install dependencies for the build system:  
    ```bash
    pip install -r pip-requirements.txt --upgrade
    ```

3.  Install extra dependencies:
    ```bash
    npm install -g cspell markdownlint-cli
    ```

## Building EDK2

1.  Set information about the build:
    ```bash
    ARCH=X64 # CPU Architecture
    PLATFORM=/path/to/Platform.py
    PACKAGE=NameOfPackage # Name of package
    TYPE=RELEASE # `RELEASE` or `DEBUG`
    ARGS="BLD_*_EXAMPLE_OPTION=1" # Use`BLD_*_` instead of `-D`
    ```

2.  Install compile-time dependencies, then start the build:
    ```bash
    stuart_update -c $PLATFORM
    stuart_setup-c $PLATFORM
    stuart_build -c $PLATFORM -p $PACKAGE -a $ARCH TARGET=$TYPE TOOL_CHAIN_TAG=GCC5 $ARGS
    ```

3. The results of the build can be found in `./Build`

### Example config for building OVMF

This will build OVMF for x86_64 with secure boot and TPM support enabled.

```bash
ARCH=X64
PLATFORM=OvmfPkg/PlatformCI/PlatformBuild.py
PACKAGE=OvmfPkg
TYPE=RELEASE
ARGS="BLD_**SECURE_BOOT_ENABLE=1 BLD**_TPM2_ENABLE=1"
```
