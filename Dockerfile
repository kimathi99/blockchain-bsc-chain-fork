# Use Ubuntu 20.04 as the base image
FROM ubuntu:20.04

# Install basic dependencies
RUN apt update && apt install -y git wget make gcc g++ curl

# Install Go (we use Go 1.20.12 for compatibility)
RUN wget https://go.dev/dl/go1.20.12.linux-amd64.tar.gz && \
    tar -C /usr/local -xzf go1.20.12.linux-amd64.tar.gz && \
    rm go1.20.12.linux-amd64.tar.gz

# Install Node.js (using NodeSource for Node v18)
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# Set Go environment variables
ENV PATH=$PATH:/usr/local/go/bin
ENV GOPATH=/go

# Clone the BSC repository at tag v1.3.0 and build geth
RUN git clone --branch v1.3.0 --depth 1 https://github.com/bnb-chain/bsc.git /app/bsc && \
    cd /app/bsc && make geth

# Copy the geth binary to a global location and make it executable
RUN cp /app/bsc/build/bin/geth /usr/local/bin/geth && \
    chmod +x /usr/local/bin/geth

# Ensure geth is in the PATH
ENV PATH="/usr/local/bin:/app/bsc/build/bin:${PATH}"

# Set the working directory (we use /app so that we can later store scripts, etc.)
WORKDIR /app

# Set the default entrypoint to geth
ENTRYPOINT ["/usr/local/bin/geth"]
