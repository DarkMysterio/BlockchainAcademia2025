"""
Simple Ganache Starter for Ocean.py
Starts local blockchain for development
"""

import subprocess
import socket
import sys
import time
import os

def check_port(port):
    """Check if a port is available"""
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    try:
        sock.bind(('localhost', port))
        sock.close()
        return True
    except:
        sock.close()
        return False

def find_available_port(start_port=8545):
    """Find an available port starting from start_port"""
    for port in range(start_port, start_port + 10):
        if check_port(port):
            return port
    return None

def start_ganache():
    """Start Ganache CLI with available port"""
    print("🌊 Ocean.py Local Blockchain Starter")
    print("=" * 40)
    
    # Find Ganache CLI executable
    ganache_paths = [
        'ganache-cli',  # If in PATH
        'C:\\Users\\vonic\\AppData\\Roaming\\npm\\ganache-cli.cmd',  # Windows npm global
        os.path.expanduser('~\\AppData\\Roaming\\npm\\ganache-cli.cmd')  # Current user
    ]
    
    ganache_exe = None
    for path in ganache_paths:
        try:
            subprocess.run([path, '--version'], capture_output=True, text=True, check=True)
            ganache_exe = path
            print(f"✅ Found Ganache CLI: {path}")
            break
        except:
            continue
    
    if not ganache_exe:
        print("❌ Ganache CLI not found!")
        print("   Install with: npm install -g ganache-cli")
        return False
    
    # Find available port
    port = find_available_port(8545)
    if not port:
        print("❌ No available ports found (8545-8554)")
        return False
    
    print(f"✅ Using port {port}")
    
    # Ganache command
    cmd = [
        ganache_exe,
        '--deterministic',
        '--accounts', '10',
        '--host', '0.0.0.0',
        '--port', str(port),
        '--gasLimit', '0x1fffffffffffff',
        '--gasPrice', '0x1'
    ]
    
    print("🚀 Starting Ganache...")
    print("   This terminal will stay open while blockchain runs")
    print("   Press Ctrl+C to stop")
    print("   Use another terminal for Ocean.py scripts")
    print()
    print(f"   📡 Blockchain URL: http://localhost:{port}")
    print()
    
    try:
        # Start Ganache
        subprocess.run(cmd)
    except FileNotFoundError:
        print("❌ Ganache CLI not found!")
        print("   Install with: npm install -g ganache-cli")
        return False
    except KeyboardInterrupt:
        print("\n🛑 Ganache stopped")
        return True
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

if __name__ == "__main__":
    start_ganache()
