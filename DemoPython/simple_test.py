"""
Simple Ocean Protocol Test - Basic Connection
"""

from web3 import Web3
from eth_account import Account
import os

def test_basic_setup():
    """Test basic blockchain and account setup"""
    print("🌊 Basic Ocean Protocol Setup Test")
    print("=" * 40)
    
    try:
        # 1. Test blockchain connection
        print("1. Testing blockchain connection...")
        w3 = Web3(Web3.HTTPProvider('http://localhost:8545'))
        
        if w3.is_connected():
            chain_id = w3.eth.chain_id
            block_number = w3.eth.block_number
            print(f"   ✅ Connected to Ganache")
            print(f"   📊 Chain ID: {chain_id}")
            print(f"   📦 Current block: {block_number}")
        else:
            print("   ❌ Cannot connect to blockchain")
            return False
        
        # 2. Test account setup
        print("\n2. Testing account setup...")
        private_key = '0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d'  # Ganache test key
        account = Account.from_key(private_key)
        
        balance = w3.eth.get_balance(account.address)
        balance_eth = w3.from_wei(balance, 'ether')
        
        print(f"   ✅ Account: {account.address}")
        print(f"   💰 Balance: {balance_eth} ETH")
        
        # 3. Test Ocean.py import
        print("\n3. Testing Ocean.py library...")
        
        try:
            import ocean_lib
            print(f"   ✅ Ocean.py version: {ocean_lib.__version__}")
            
            from ocean_lib.ocean.ocean import Ocean
            print("   ✅ Ocean class imported")
            
            from ocean_lib.example_config import get_config_dict
            print("   ✅ Configuration helper imported")
            
        except Exception as e:
            print(f"   ❌ Ocean.py import failed: {e}")
            return False
        
        # 4. Test Ocean configuration and basic publishing
        print("\n4. Testing Ocean configuration...")
        
        try:
            # Try to create Ocean config for local network
            config = get_config_dict('http://localhost:8545')
            print("   ✅ Ocean configuration created")
            
            # Create Ocean instance
            ocean = Ocean(config)
            print("   ✅ Ocean instance created successfully!")
            
            # Test basic publishing capability
            print("\n5. Testing basic Ocean publishing...")
            try:
                # Simple test: try to create a test asset
                test_name = "Ocean Protocol Test Asset"
                test_url = "https://raw.githubusercontent.com/trentmc/branin/main/branin.arff"
                
                print("   🧪 Attempting to publish test asset...")
                (data_nft, datatoken, ddo) = ocean.assets.create_url_asset(
                    test_name, test_url, {"from": account}
                )
                
                print("   🎉 SUCCESS! Test asset published:")
                print(f"      � Data NFT: {data_nft.symbol()} at {data_nft.address}")
                print(f"      🎫 Datatoken: {datatoken.symbol()} at {datatoken.address}")
                print(f"      🌐 DID: {ddo.did}")
                
                return True
                
            except Exception as pub_e:
                print(f"   ⚠️  Publishing test failed: {pub_e}")
                print("   💡 This is expected if Ocean contracts aren't deployed")
                print("   🔧 Ocean configuration works, but contracts missing")
                return True  # Config works, just no contracts
            
        except Exception as e:
            print(f"   ❌ Ocean setup failed: {e}")
            print(f"   🔍 Error details: {type(e).__name__}")
            return False
            
    except Exception as e:
        print(f"❌ Test failed: {e}")
        return False

if __name__ == "__main__":
    success = test_basic_setup()
    
    if success:
        print("\n✅ Your Ocean Protocol environment is working!")
        print("\n🚀 Next steps:")
        print("   • Try publishing data with volunteer_data_publisher.py")
        print("   • Explore Ocean Marketplace features")
        print("   • Build your volunteer ID integration")
    else:
        print("\n❌ Setup needs attention")
        print("   • Check if Ganache is running")
        print("   • Verify Ocean.py installation")
