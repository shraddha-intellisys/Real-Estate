// homesListData.js
const sampleImages = [
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1605146769289-440113cc3d00?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600121848594-d8644e57abab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600585152221-90383e860275?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600607687933-ce8bb6d11b9b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600607687933-ce8bb6d11b9b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
];

export const generateHomesData = () => {
  const types = ["For Sale", "For Rent", "Luxury"];
  const cities = ["Pune", "Mumbai", "Bangalore", "Hyderabad", "Delhi", "Chennai"];
  const areas = ["Green Park", "Marine Drive", "Whitefield", "Koregaon Park", "Bandra West", "Baner Road", "Jubilee Hills"];
  
  // Original unique homes with proper images
  const existingHomes = [
    {
      id: 1,
      type: "For Sale",
      price: "₹75,00,000",
      address: "123 Green Park, Pune",
      beds: 3,
      baths: 2,
      area: 1800,
      image: sampleImages[0],
      description: "Beautiful modern home with spacious living areas and large garden."
    },
    {
      id: 2,
      type: "For Rent",
      price: "₹35,000/month",
      address: "456 Marine Drive, Mumbai",
      beds: 2,
      baths: 2,
      area: 1200,
      image: sampleImages[1],
      description: "Luxury apartment with stunning sea views."
    },
    {
      id: 3,
      type: "For Sale",
      price: "₹1,20,00,000",
      address: "789 Whitefield, Bangalore",
      beds: 4,
      baths: 3,
      area: 2500,
      image: sampleImages[2],
      description: "Spacious villa with modern architecture and premium finishes."
    },
    {
      id: 4,
      type: "Luxury",
      price: "₹2,50,00,000",
      address: "101 Koregaon Park, Pune",
      beds: 5,
      baths: 4,
      area: 4000,
      image: sampleImages[3],
      description: "Exclusive luxury residence with high-end finishes."
    },
    {
      id: 5,
      type: "For Rent",
      price: "₹45,000/month",
      address: "202 Bandra West, Mumbai",
      beds: 3,
      baths: 2,
      area: 1800,
      image: sampleImages[4],
      description: "Charming apartment in prime location."
    },
    {
      id: 6,
      type: "For Sale",
      price: "₹95,00,000",
      address: "303 Baner Road, Pune",
      beds: 3,
      baths: 3,
      area: 2200,
      image: sampleImages[5],
      description: "Contemporary home with open floor plan."
    },
    {
      id: 7,
      type: "Luxury",
      price: "₹3,75,00,000",
      address: "404 Jubilee Hills, Hyderabad",
      beds: 6,
      baths: 5,
      area: 5500,
      image: sampleImages[6],
      description: "Palatial estate with resort-style amenities."
    },
    {
      id: 8,
      type: "For Rent",
      price: "₹28,000/month",
      address: "505 Andheri East, Mumbai",
      beds: 2,
      baths: 1,
      area: 1000,
      image: sampleImages[7],
      description: "Cozy apartment with efficient layout."
    },
    {
      id: 9,
      type: "For Sale",
      price: "₹62,00,000",
      address: "606 Kothrud, Pune",
      beds: 3,
      baths: 2,
      area: 1600,
      image: sampleImages[8],
      description: "Well-maintained home in established neighborhood."
    },
    {
      id: 10,
      type: "Luxury",
      price: "₹4,20,00,000",
      address: "707 Malabar Hill, Mumbai",
      beds: 5,
      baths: 4,
      area: 4500,
      image: sampleImages[9],
      description: "Ultra-luxury penthouse with panoramic views."
    }
  ];

  const homes = [...existingHomes];
  const existingIds = new Set(existingHomes.map(home => home.id));

  // Generate additional homes with guaranteed working images
  for (let i = 0; i < 9990; i++) {
    let id;
    do {
      id = Math.floor(Math.random() * 100000) + 11;
    } while (existingIds.has(id));
    
    existingIds.add(id);
    
    const type = types[Math.floor(Math.random() * types.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];
    const area = areas[Math.floor(Math.random() * areas.length)];
    const beds = Math.floor(Math.random() * 5) + 1;
    const baths = Math.max(beds - 1, 1);
    const baseArea = beds * 600 + Math.random() * 400;
    const randomImageIndex = Math.floor(Math.random() * sampleImages.length);
    const randomImage = sampleImages[randomImageIndex];
    
    // Double-check image URL
    const validatedImage = randomImage.includes('?') 
      ? randomImage 
      : `${randomImage}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80`;
    
    homes.push({
      id,
      type,
      price: type === "For Rent" 
        ? `₹${Math.floor(Math.random() * 50000) + 15000}/month` 
        : `₹${Math.floor(Math.random() * 50000000) + 5000000}`,
      address: `${Math.floor(Math.random() * 1000)} ${area}, ${city}`,
      beds,
      baths,
      area: Math.floor(baseArea),
      image: validatedImage,
      description: `Beautiful ${type.toLowerCase()} property in ${area}, ${city}.`
    });
  }
  
  return homes;
};

export const homesListData = generateHomesData();