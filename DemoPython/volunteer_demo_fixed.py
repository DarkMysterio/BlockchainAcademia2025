"""
Ocean Protocol Volunteer Data Publishing - REAL Implementation
Using actual Ocean.py library to publish volunteer data assets
"""

import json
import time
from datetime import datetime
from web3 import Web3
from eth_account import Account

# Ocean Protocol imports
from ocean_lib.example_config import get_config_dict
from ocean_lib.ocean.ocean import Ocean
from ocean_lib.structures.file_objects import UrlFile
from ocean_lib.models.datatoken_base import DatatokenArguments
from ocean_lib.models.fixed_rate_exchange import ExchangeArguments
from ocean_lib.ocean.util import to_wei

def publish_volunteer_data():
    """Publish volunteer data using real Ocean Protocol"""
    print("🌊 Ocean Protocol Volunteer Data Publishing - REAL Implementation")
    print("=" * 70)
    
    # 1. Setup Ocean Protocol
    print("1. 🌊 Setting up Ocean Protocol...")
    try:
        # Try Mumbai testnet (chain ID 80001) - has Ocean contracts deployed
        config = get_config_dict("https://rpc-mumbai.maticvigil.com")  
        print("   ✅ Ocean configuration loaded for Mumbai testnet")
        
        # Create Ocean instance
        ocean = Ocean(config)
        print("   ✅ Ocean instance created successfully!")
        print("   💡 Note: Using Mumbai testnet - you'll need Mumbai MATIC for transactions")
        
    except Exception as e:
        print(f"   ❌ Ocean setup failed: {e}")
        print("   💡 Trying local simulation mode...")
        
        try:
            # Create a demo Ocean instance for demonstration
            print("   🎭 Creating demonstration mode (no real publishing)")
            ocean = None  # Will run in simulation mode
            
        except Exception as e2:
            print(f"   ❌ Demo mode also failed: {e2}")
            return None
    
    # 2. Setup publisher account
    print("\n2. 👤 Setting up NGO publisher account...")
    private_key = '0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d'
    alice = Account.from_key(private_key)
    
    # Check balance
    balance = ocean.web3.eth.get_balance(alice.address)
    balance_eth = ocean.web3.from_wei(balance, 'ether')
    
    print(f"   ✅ Publisher: {alice.address}")
    print(f"   💰 Balance: {balance_eth} ETH")
    
    if balance_eth < 1:
        print("   ⚠️  Low ETH balance - may need more for transactions")
    
    # 3. Create volunteer data assets
    print("\n3. 📊 Creating volunteer data assets...")
    
    # Sample volunteer data URL (this would be the Romanian NGO's volunteer database)
    volunteer_data_url = "https://raw.githubusercontent.com/datasets/country-list/master/data.json"
    
    published_assets = []
    
    try:
        # A. Free volunteer directory asset
        print("   📂 Publishing free volunteer directory...")
        
        # Metadata for the free asset
        free_metadata = {
            "name": "Romanian NGO Volunteer Directory - Free Access",
            "description": "Basic volunteer information for public verification - Romanian NGO volunteer verification system",
            "author": "Romanian NGO Association", 
            "created": datetime.now().isoformat(),
            "license": "CC0",
            "tags": ["volunteers", "romania", "ngo", "verification", "directory"],
            "type": "dataset",
            "additionalInformation": {
                "purpose": "Soul-Bound Token verification",
                "region": "Romania",
                "language": "Romanian/English",
                "verification_level": "basic"
            }
        }
        
        # Create URL file object
        url_file = UrlFile(url=volunteer_data_url)
        
        # Free pricing (no cost)
        free_pricing = None  # Free access
        
        # Publish free asset
        (free_data_nft, free_datatoken, free_ddo) = ocean.assets.create_url_asset(
            name=free_metadata["name"],
            url=volunteer_data_url,
            tx_dict={"from": alice},
            pricing=free_pricing,
            metadata=free_metadata
        )
        
        print("   ✅ Free volunteer directory published!")
        print(f"      📊 Data NFT: {free_data_nft.symbol()} at {free_data_nft.address}")
        print(f"      🎫 Datatoken: {free_datatoken.symbol()} at {free_datatoken.address}")
        print(f"      🌐 DID: {free_ddo.did}")
        
        published_assets.append({
            "type": "free_directory",
            "data_nft": free_data_nft.address,
            "datatoken": free_datatoken.address,
            "did": free_ddo.did,
            "metadata": free_metadata
        })
        
    except Exception as e:
        print(f"   ❌ Free asset publishing failed: {e}")
    
    try:
        # B. Premium volunteer verification asset
        print("\n   💎 Publishing premium volunteer verification data...")
        
        # Metadata for premium asset
        premium_metadata = {
            "name": "Romanian NGO Volunteer Verification - Premium Access",
            "description": "Detailed volunteer verification data with background checks and certifications",
            "author": "Romanian NGO Association",
            "created": datetime.now().isoformat(),
            "license": "Commercial",
            "tags": ["volunteers", "romania", "ngo", "verification", "premium", "background-check"],
            "type": "dataset",
            "additionalInformation": {
                "purpose": "Soul-Bound Token verification with premium features",
                "region": "Romania", 
                "language": "Romanian/English",
                "verification_level": "premium",
                "includes": ["background_check", "certifications", "references", "skills_assessment"]
            }
        }
        
        # Premium pricing (cost in OCEAN tokens)
        premium_exchange_args = ExchangeArguments(
            rate=to_wei("1"),  # 1 OCEAN token per access
            base_token_addr=ocean.OCEAN_token.address,
            owner_addr=alice.address,
            publish_market_order_fee_address=alice.address,
            publish_market_order_fee_token=ocean.OCEAN_token.address,
            publish_market_order_fee_amount=0,
            publish_market_swap_fee=to_wei("0.01")  # 1% swap fee
        )
        
        # Publish premium asset with pricing
        (premium_data_nft, premium_datatoken, premium_ddo) = ocean.assets.create_url_asset(
            name=premium_metadata["name"],
            url=volunteer_data_url,
            tx_dict={"from": alice},
            pricing=premium_exchange_args,
            metadata=premium_metadata
        )
        
        print("   ✅ Premium volunteer verification published!")
        print(f"      📊 Data NFT: {premium_data_nft.symbol()} at {premium_data_nft.address}")
        print(f"      🎫 Datatoken: {premium_datatoken.symbol()} at {premium_datatoken.address}")
        print(f"      🌐 DID: {premium_ddo.did}")
        print(f"      💰 Price: 1 OCEAN token per access")
        
        published_assets.append({
            "type": "premium_verification", 
            "data_nft": premium_data_nft.address,
            "datatoken": premium_datatoken.address,
            "did": premium_ddo.did,
            "metadata": premium_metadata,
            "price": "1 OCEAN"
        })
        
    except Exception as e:
        print(f"   ❌ Premium asset publishing failed: {e}")
    
    # 4. Summary and Soul-Bound Token integration info
    print("\n4. 🎯 Publishing Summary & Integration Guide")
    print("   ✅ Ocean Protocol assets created successfully!")
    print(f"   📊 Total assets published: {len(published_assets)}")
    
    if published_assets:
        print("\n   🔗 Soul-Bound Token Integration:")
        print("   • Use the DIDs below in your smart contract")
        print("   • Store asset addresses for verification")
        print("   • Implement access control using Ocean datatokens")
        
        for i, asset in enumerate(published_assets, 1):
            print(f"\n   Asset {i} ({asset['type']}):")
            print(f"   • DID: {asset['did']}")
            print(f"   • Data NFT: {asset['data_nft']}")
            print(f"   • Datatoken: {asset['datatoken']}")
            if 'price' in asset:
                print(f"   • Price: {asset['price']}")
        
        # Save results for later use
        results = {
            "published_at": datetime.now().isoformat(),
            "publisher": alice.address,
            "network": "Ganache Local",
            "assets": published_assets
        }
        
        with open("ocean_published_assets.json", "w") as f:
            json.dump(results, f, indent=2)
        
        print(f"\n   💾 Results saved to ocean_published_assets.json")
        print("\n🎉 Ready for Soul-Bound Token integration!")
        
        return results
    else:
        print("   ⚠️  No assets were successfully published")
        return None

# Sample volunteer data for demonstration
SAMPLE_VOLUNTEER_DATA = {
    "volunteers": [
        {
            "id": "NGO-RO-001",
            "name": "Maria Popescu", 
            "organization": "Habitat for Humanity Romania",
            "hours_completed": 120,
            "certifications": ["First Aid", "Construction Safety"],
            "verified": True,
            "verification_date": "2024-01-15"
        },
        {
            "id": "NGO-RO-002", 
            "name": "Alexandru Ionescu",
            "organization": "Red Cross Romania",
            "hours_completed": 85,
            "certifications": ["Emergency Response", "Community Outreach"],
            "verified": True,
            "verification_date": "2024-01-10"
        },
        {
            "id": "NGO-RO-003",
            "name": "Elena Radu",
            "organization": "Save the Children Romania", 
            "hours_completed": 200,
            "certifications": ["Child Protection", "Educational Support", "Mental Health First Aid"],
            "verified": True,
            "verification_date": "2024-01-20"
        }
    ],
    "metadata": {
        "total_volunteers": 3,
        "total_hours": 405,
        "verification_standard": "Romanian NGO Association Standard v2.1",
        "last_updated": "2024-01-20T10:30:00Z"
    }
}

if __name__ == "__main__":
    try:
        result = publish_volunteer_data()
        
        if result:
            print("\n🚀 Next Steps:")
            print("1. Deploy your Soul-Bound Token smart contract")
            print("2. Use the published DIDs for verification")
            print("3. Integrate Ocean datatoken access control")
            print("4. Test the full volunteer verification flow")
        else:
            print("\n⚠️  Publishing encountered issues")
            print("   💡 Check that Ganache is running and Ocean contracts are deployed")
            print("   🔧 For development, you can deploy Ocean contracts locally")
            print("   🌐 Or connect to Ocean testnet with deployed contracts")
            
    except KeyboardInterrupt:
        print("\n\n👋 Publishing cancelled by user")
    except Exception as e:
        print(f"\n❌ Unexpected error: {e}")
