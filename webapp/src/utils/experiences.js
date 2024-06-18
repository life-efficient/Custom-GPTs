const offers = [
    {
        "id": "1c9b8c1e-d447-4f62-8b2c-6d08a2f8f9e7",
        "name": "Maha Shivaratri at Varanasi",
        "description": "Private jet to Varanasi, India, for the Maha Shivaratri festival, with guided visits to the Kashi Vishwanath Temple and participation in the night-long rituals, accompanied by luxury accommodations.",
        "image": "/images/maha.webp"
    },
    {
        "id": "5b8b97f6-48f2-4b6b-882e-7b58f27c6f59",
        "name": "Proposal in the Sky",
        "description": "A unique proposal experience aboard a private jet filled with flowers, featuring a customized flight path over scenic locations, gourmet in-flight dining, and a post-proposal celebration.",
        "image": "/images/proposal.webp"
    },
    {
        "id": "9d8ef6e3-9b4e-4f76-bd14-60e2e87a5f31",
        "name": "Late Valentines Escape",
        "description": "Private jet travel to a romantic destination for a belated Valentine's celebration, with the jet adorned with flowers. Includes a stay at a luxury resort, couples’ spa treatments, candlelit dinners, and personalized romantic activities.",
        "image": "/images/valentine.webp"
    },
    {
        "id": "e9d6e39f-2a2c-4563-9c8b-8b5e7a82ed3c",
        "name": "LV Luxury Shopping Experience",
        "description": "Private jet travel to Louis Vuitton's flagship store to shop their latest collection. Includes a personal shopper, exclusive previews, VIP fitting rooms, and luxury refreshments.",
        "image": "/images/lv.webp"
    },
    {
        "id": "d9f2c62b-5f53-4f52-8b2c-1d08a3e9f8a9",
        "name": "Navaratri in Gujarat",
        "description": "Private jet travel to Gujarat, India, for the Navaratri festival, with VIP access to Garba dance events, temple visits, and luxury accommodations.",
        "image": "/images/navaratri.webp"
    },
    {
        "id": "f3a2e4d9-3a1f-4d28-9b1c-8c5f7e7a6b2a",
        "name": "Honeymoon Luxury Getaway",
        "description": "Private jet travel to a luxurious destination, with premium accommodations, personalized services, and romantic activities tailored for newlyweds.",
        "image": "/images/honeymoon.webp"
    },
    {
        "id": "a6e3d8b9-4f92-4f62-8b3d-6e08a5f9d6c7",
        "name": "Anniversary Date Experience",
        "description": "Fly on a private jet for an anniversary celebration, including a stay at a luxury hotel, a gourmet dinner, and exclusive romantic experiences.",
        "image": "/images/anniversary.webp"
    },
    // {
    //     "id": "b7c9f4e8-5d83-4b52-9c7a-8f5e8a7b9d5f",
    //     "name": "Hajj Journey",
    //     "description": "Private jet travel to Mecca, Saudi Arabia, for the Hajj pilgrimage, with VIP services, luxury accommodations, and guided support throughout the journey.",
    //     "image": "/images/hajj.webp"
    // },
    // {
    //     "id": "a6e3d8b9-4f92-4f62-8b3d-6e08a5f9d6c7",
    //     "name": "Spiritual Serenity",
    //     "description": "Elevate your spiritual journey with JetSail as you embark on a luxurious flight to the serene monasteries in Thailand. Experience the profound tranquility of morning rituals with the monks, surrounded by the majestic landscapes and ancient temples. Our service ensures a seamless blend of cultural immersion and unparalleled comfort, providing you with a transformative and deeply enriching experience. Let JetSail take care of every detail, from exclusive access to spiritual guidance, making your journey truly unforgettable.",
    //     "image": "/images/spiritual_serenity.webp"
    // },
    // {
    //     "id": "b7e3d8b9-4f92-4f62-8b3d-6e08a5f9d6c8",
    //     "name": "Private Jiro Sushi",
    //     "description": "Discover the pinnacle of culinary excellence with JetSail's exclusive private dining experience at Jiro Sushi in Tokyo. Savor meticulously crafted sushi, prepared by master chefs, in an intimate setting reserved just for you. Our luxurious jet service ensures you arrive in style and comfort, ready to indulge in the finest flavors Japan has to offer. This bespoke experience combines world-class cuisine with JetSail's signature luxury, creating a dining event that is both extraordinary and unforgettable.",
    //     "image": "/images/private_jiro_sushi.webp"
    // },
    // {
    //     "id": "c8e3d8b9-4f92-4f62-8b3d-6e08a5f9d6c9",
    //     "name": "Bhutan Aerial Tour",
    //     "description": "Experience the breathtaking beauty of Bhutan from a unique vantage point with JetSail's helicopter tours. Soar above the majestic Himalayan landscapes, witnessing the country's stunning monasteries, ancient fortresses, and pristine natural beauty. Our luxurious jets ensure your journey to and from Bhutan is as comfortable as it is scenic. Once there, our helicopter tours provide an unparalleled perspective, allowing you to explore this mystical kingdom in the utmost comfort and style, making your adventure truly unforgettable.",
    //     "image": "/images/bhutan_aerial_tour.webp"
    // },
    // {
    //     "id": "d9e3d8b9-4f92-4f62-8b3d-6e08a5f9d6ca",
    //     "name": "Nepali Retreat",
    //     "description": "Discover inner peace and spiritual rejuvenation with JetSail's exclusive trip to Nepal. Our luxurious jets whisk you away to this mystical land, where you will explore the rich cultural heritage, breathtaking landscapes, and ancient temples. Engage in yoga and meditation sessions, guided by renowned practitioners, amid the tranquil settings of the Himalayas. JetSail ensures every aspect of your journey is seamless and luxurious, providing a perfect balance of adventure, relaxation, and spiritual growth.",
    //     "image": "/images/nepali_retreat.webp"
    // },
    // {
    //     "id": "eae3d8b9-4f92-4f62-8b3d-6e08a5f9d6cb",
    //     "name": "Korean Dining",
    //     "description": "Indulge in Korea's finest culinary traditions with JetSail's curated dining experiences. Our luxury jets transport you to the heart of Seoul, where you will enjoy exclusive access to the city's top dining establishments. Savor exquisite dishes crafted by renowned chefs, each meal offering a symphony of flavors that reflect Korea's rich culinary heritage. JetSail's service ensures a seamless and elegant journey, from your luxurious flight to your private dining experiences, making every moment a celebration of taste and sophistication.",
    //     "image": "/images/korean_dining.webp"
    // },
    // {
    //     "id": "fbf3d8b9-4f92-4f62-8b3d-6e08a5f9d6cc",
    //     "name": "VIP Las Vegas Grand Prix",
    //     "description": "Feel the adrenaline rush and excitement of the Las Vegas Grand Prix with JetSail's VIP packages. Our luxurious jets ensure you arrive in style, ready to experience the thrill of high-speed racing from the best seats in the house. Enjoy exclusive access to VIP lounges, meet racing legends, and indulge in gourmet cuisine and premium beverages. JetSail's impeccable service ensures every detail is taken care of, providing you with a weekend of unparalleled excitement, luxury, and entertainment.",
    //     "image": "/images/vip_las_vegas_grand_prix.webp"
    // },
    // {
    //     "id": "gcf3d8b9-4f92-4f62-8b3d-6e08a5f9d6cd",
    //     "name": "Mexican Hacienda Stay",
    //     "description": "Immerse yourself in the rich culture and stunning landscapes of Mexico with JetSail's private hacienda stay. Our luxurious jets transport you to your exclusive retreat, where you will enjoy personalized service, gourmet dining, and exquisite accommodations. Explore the vibrant local culture, relax by the pool, or take a private tour of nearby historical sites. JetSail ensures your stay is as comfortable and indulgent as possible, providing a perfect blend of luxury, relaxation, and cultural immersion.",
    //     "image": "/images/mexican_hacienda_stay.webp"
    // },
    // {
    //     "id": "hdf3d8b9-4f92-4f62-8b3d-6e08a5f9d6ce",
    //     "name": "Masseto & Florence",
    //     "description": "Experience the ultimate in luxury and sophistication with JetSail's helicopter tour to Masseto and stay in Florence. Fly over the picturesque vineyards of Tuscany, landing at the renowned Masseto winery for a private tasting of their exceptional wines. Continue your journey to Florence, where you will stay in a luxurious hotel and explore the city's rich artistic heritage. JetSail's seamless service ensures every detail is perfect, from your helicopter ride to your bespoke itinerary, making your Italian adventure truly unforgettable.",
    //     "image": "/images/masseto_florence.webp"
    // },
    // {
    //     "id": "ief3d8b9-4f92-4f62-8b3d-6e08a5f9d6cf",
    //     "name": "Dubai Yacht",
    //     "description": "Sail through the sparkling waters of Dubai on a private yacht with JetSail. Our luxurious jets bring you to this vibrant city, where you will board your exclusive yacht and embark on a journey of unparalleled luxury. Enjoy panoramic views of Dubai's iconic skyline, relax in opulent surroundings, and indulge in gourmet cuisine prepared by a private chef. JetSail ensures your experience is seamless and extravagant, providing a unique perspective of Dubai's grandeur from the comfort of your own yacht.",
    //     "image": "/images/dubai_yacht.webp"
    // },
    // {
    //     "id": "jff3d8b9-4f92-4f62-8b3d-6e08a5f9d6d0",
    //     "name": "Palladia Villa",
    //     "description": "Explore the luxurious lifestyle of the French Riviera with JetSail's exclusive villa tours. Our jets transport you to the heart of this glamorous region, where you will stay in opulent villas and experience the best of coastal living. Enjoy private tours of historical sites, indulge in gourmet dining, and relax in the comfort of your lavish accommodations. JetSail's impeccable service ensures every aspect of your journey is perfect, providing a truly luxurious and unforgettable Riviera experience.",
    //     "image": "/images/palladia_villa.webp"
    // },
    // {
    //     "id": "kgg3d8b9-4f92-4f62-8b3d-6e08a5f9d6d1",
    //     "name": "Augusta National Access",
    //     "description": "Gain exclusive access to the prestigious Augusta National Golf Club with JetSail's golfing elite package. Our luxurious jets ensure you arrive in style, ready to play on one of the world's most iconic courses. Enjoy personalized service, private coaching sessions, and exclusive access to club facilities. JetSail's attention to detail and commitment to luxury ensure your golfing experience is extraordinary, providing the ultimate for discerning golfers who demand the very best.",
    //     "image": "/images/augusta_national_access.webp"
    // },
    // {
    //     "id": "lhh3d8b9-4f92-4f62-8b3d-6e08a5f9d6d2",
    //     "name": "Tuscan Villa Tour",
    //     "description": "Tour the exquisite villas of Tuscany with JetSail, experiencing the finest in Italian living and craftsmanship. Our luxurious jets transport you to this beautiful region, where you will explore stunning villas, taste local wines, and enjoy gourmet cuisine. JetSail's personalized service ensures every detail of your journey is perfect, from private tours to bespoke itineraries. Discover the charm and elegance of Tuscany with JetSail, making your villa tour a truly unforgettable experience.",
    //     "image": "/images/tuscan_villa_tour.webp"
    // },
    // {
    //     "id": "mii3d8b9-4f92-4f62-8b3d-6e08a5f9d6d3",
    //     "name": "Napa Premium Tour",
    //     "description": "Enjoy a private and luxurious Napa wine tour with JetSail, perfect for wine connoisseurs. Our jets bring you to the heart of California"
    // },
    //     {
    //     "id": "mii3d8b9-4f92-4f62-8b3d-6e08a5f9d6d3",
    //     "name": "Napa Premium Tour",
    //     "description": "Enjoy a private and luxurious Napa wine tour with JetSail, perfect for wine connoisseurs. Our jets bring you to the heart of California's wine country, where you will enjoy exclusive tastings at the region's most prestigious wineries. Stay in luxurious accommodations, dine at gourmet restaurants, and relax in the serene beauty of Napa Valley. JetSail's seamless service ensures your wine tour is a perfect blend of luxury, relaxation, and epicurean delight.",
    //     "image": "/images/napa_premium_tour.webp"
    // },
    // {
    //     "id": "nii3d8b9-4f92-4f62-8b3d-6e08a5f9d6d4",
    //     "name": "Paris Olympics",
    //     "description": "Witness the Paris Olympics in style with JetSail, offering exclusive access and luxurious accommodations. Our jets transport you to the heart of the action, where you will enjoy VIP seating, private tours, and exclusive events. Experience the excitement of the games, explore the beauty of Paris, and relax in your luxurious accommodations. JetSail's impeccable service ensures every detail is perfect, providing you with an unforgettable Olympic adventure in one of the world's most iconic cities.",
    //     "image": "/images/paris_olympics.webp"
    // },
    // {
    //     "id": "oii3d8b9-4f92-4f62-8b3d-6e08a5f9d6d5",
    //     "name": "St. Tropez Villa",
    //     "description": "Stay in a glamorous St. Tropez villa with JetSail, experiencing the best of coastal luxury and vibrant nightlife. Our jets bring you to this beautiful destination, where you will enjoy personalized service, exquisite accommodations, and exclusive access to the region's top attractions. Relax by the pool, explore the vibrant local scene, and indulge in gourmet dining. JetSail's attention to detail ensures your stay is as luxurious and enjoyable as possible, making your St. Tropez villa experience truly exceptional.",
    //     "image": "/images/st_tropez_villa.webp"
    // },
    // {
    //     "id": "pii3d8b9-4f92-4f62-8b3d-6e08a5f9d6d6",
    //     "name": "Burgundy Wineries",
    //     "description": "Tour the renowned wineries of Burgundy with JetSail, indulging in the finest French vintages. Our jets transport you to this beautiful region, where you will enjoy private tastings, gourmet dining, and luxurious accommodations. Explore the scenic vineyards, learn about the art of winemaking, and savor the exquisite flavors of Burgundy's wines. JetSail's impeccable service ensures every detail of your journey is perfect, providing a luxurious and unforgettable wine tour experience.",
    //     "image": "/images/burgundy_wineries.webp"
    // },
    // {
    //     "id": "qii3d8b9-4f92-4f62-8b3d-6e08a5f9d6d7",
    //     "name": "London Art Galleries",
    //     "description": "Explore London's exclusive art galleries with JetSail, enjoying the world's finest art collections in luxury. Our jets bring you to the heart of this vibrant city, where you will enjoy private tours, expert guides, and exclusive access to renowned galleries. Discover masterpieces, engage with contemporary art, and relax in luxurious accommodations. JetSail's attention to detail ensures your art tour is a perfect blend of cultural enrichment and luxurious comfort.",
    //     "image": "/images/london_art_galleries.webp"
    // },
    // {
    //     "id": "rii3d8b9-4f92-4f62-8b3d-6e08a5f9d6d8",
    //     "name": "Lake Como Villas",
    //     "description": "Stay in luxurious villas on Lake Como with JetSail, inspired by the lake's poetic and historical charm. Our jets transport you to this stunning destination, where you will enjoy exquisite accommodations, private boat tours, and gourmet dining. Explore the scenic beauty of Lake Como, relax in the comfort of your villa, and indulge in the region's finest cuisine. JetSail's impeccable service ensures every detail is perfect, providing a truly luxurious and unforgettable Lake Como experience.",
    //     "image": "/images/lake_como_villas.webp"
    // },
    // {
    //     "id": "sii3d8b9-4f92-4f62-8b3d-6e08a5f9d6d9",
    //     "name": "Bordeaux Tour",
    //     "description": "Experience Bordeaux's coastal retreats and acclaimed vineyards with JetSail, offering an epicurean escape. Our jets bring you to this renowned wine region, where you will enjoy private tastings, gourmet dining, and luxurious accommodations. Explore the scenic landscapes, learn about Bordeaux's rich winemaking heritage, and savor the exquisite flavors of its wines. JetSail's seamless service ensures your tour is a perfect blend of luxury, relaxation, and culinary delight.",
    //     "image": "/images/bordeaux_tour.webp"
    // },
    // {
    //     "id": "tii3d8b9-4f92-4f62-8b3d-6e08a5f9d6da",
    //     "name": "Greek Yacht",
    //     "description": "Discover Greece's rich history and vibrant culture with JetSail's private yacht journey. Our jets bring you to this beautiful destination, where you will board your exclusive yacht and embark on a journey through the stunning Greek islands. Enjoy luxurious accommodations, personalized service, and gourmet cuisine as you explore ancient ruins, pristine beaches, and charming villages. JetSail ensures every aspect of your journey is seamless and luxurious, providing an unforgettable Greek adventure.",
    //     "image": "/images/greek_yacht.webp"
    // },
    // {
    //     "id": "uii3d8b9-4f92-4f62-8b3d-6e08a5f9d6db",
    //     "name": "St. Barths Dining",
    //     "description": "Enjoy the perfect blend of French and Caribbean cuisine in St. Barths with JetSail's dining experience. Our jets transport you to this idyllic island, where you will dine at exclusive restaurants, savoring dishes crafted by world-renowned chefs. Experience the vibrant culinary scene, from beachfront eateries to fine dining establishments. Relax in luxurious accommodations and explore the stunning natural beauty of St. Barths. JetSail's attention to detail ensures your dining experience is as exquisite as the island itself, making every meal a celebration of flavor and luxury.",
    //     "image": "/images/st_barths_dining.webp"
    // },
    // {
    //     "id": "vii3d8b9-4f92-4f62-8b3d-6e08a5f9d6dc",
    //     "name": "Ultimate Antarctica",
    //     "description": "Embark on a journey to Antarctica with JetSail, experiencing the ultimate in polar luxury and adventure. Our jets bring you to this remote and pristine destination, where you will explore the breathtaking landscapes, encounter unique wildlife, and enjoy exclusive guided tours. Stay in luxurious accommodations designed for comfort in extreme conditions, and indulge in gourmet meals prepared by top chefs. JetSail ensures your expedition is seamless and unforgettable, providing a once-in-a-lifetime adventure in the world's most unspoiled wilderness.",
    //     "image": "/images/ultimate_antarctica.webp"
    // },

    {
        "id": "01e3d8b9-4f92-4f62-8b3d-6e08a5f9d6c7",
        "name": "Private Business Jets",
        "description": "Travel in luxury to domestic and international destinations such as Goa, Pune, Kerala, the Golden Triangle (Delhi-Jaipur-Agra), Udaipur, Jodhpur, the Jaisalmer desert, and the Andaman Islands.",
        "image": "/images/private_business_jets.webp"
    },
    {
        "id": "02e3d8b9-4f92-4f62-8b3d-6e08a5f9d6c8",
        "name": "Mumbai Skyline Joyride",
        "description": "Enjoy a breathtaking 30-minute or longer Cessna plane ride over the Mumbai skyline.",
        "image": "/images/mumbai_skyline_joyride.webp"
    },
    {
        "id": "03e3d8b9-4f92-4f62-8b3d-6e08a5f9d6c9",
        "name": "Chopper Travel",
        "description": "Experience convenient helicopter travel to nearby famous destinations like Shirdi, Pune, Mahabaleshwar, Lonavala, and Alibagh.",
        "image": "/images/chopper_travel.webp"
    },
    {
        "id": "04e3d8b9-4f92-4f62-8b3d-6e08a5f9d6ca",
        "name": "Luxury Yachts",
        "description": "Embark on a luxurious yacht journey to Alibagh or around Mumbai for sunset or sunrise yoga sessions, get-togethers, or business meetings over wine or champagne.",
        "image": "/images/luxury_yachts.webp"
    },
    {
        "id": "05e3d8b9-4f92-4f62-8b3d-6e08a5f9d6cb",
        "name": "Cordella Cruise",
        "description": "Enjoy a splendid 2-night, 3-day cruise to Goa or a 3-night, 4-day cruise to the Andaman Islands.",
        "image": "/images/cordella_cruise.webp"
    }
]

export default offers