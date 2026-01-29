
export type Product = {
    id: number
    title: string
    price: number
    size: string
    cat: string
    status: string
    img: string
}

export const INVENTORY: Product[] = [
    { id: 1, title: "Serene Nature", price: 249, size: "4x4", cat: "Mini", status: "Available", img: "/products/Serene Nature Art.jpg" },
    { id: 2, title: "Sunset Silhouette", price: 299, size: "4x4", cat: "Mini", status: "Available", img: "/products/Sunset Silhouette Art.jpg" },
    { id: 3, title: "Twilight Landscape", price: 299, size: "4x4", cat: "Mini", status: "Available", img: "/products/Twilight Landscape Art.jpg" },
    { id: 4, title: "Panda & Bamboo", price: 399, size: "4x4", cat: "Cute", status: "Available", img: "/products/Cute  Animal Art.jpg" },
    { id: 5, title: "Urban Cityscape", price: 449, size: "4x4", cat: "Mini", status: "Available", img: "/products/Cityscape.jpg" },
    { id: 6, title: "Magical World", price: 349, size: "4x4", cat: "Fantasy", status: "Sold Out", img: "/products/Magical world Art.jpg" },
    { id: 7, title: "Flamingo Queen", price: 799, size: "8x8", cat: "Statement", status: "Available", img: "/products/Flamingo Queen.jpg" },
    { id: 8, title: "Deadpool & Wolverine", price: 599, size: "8x8", cat: "Pop", status: "Sold Out", img: "/products/Deadpool and Wolverine.jpg" },
    { id: 9, title: "Fairytale Landscape", price: 1499, size: "6x8", cat: "Landscape", status: "Available", img: "/products/Fairytale Landscape Art.jpg" },
    { id: 10, title: "Peaceful Evening", price: 1899, size: "6x8", cat: "Landscape", status: "Available", img: "/products/Peaceful Evening Art.jpg" },
    { id: 11, title: "Italian Town", price: 3299, size: "6x8", cat: "Masterpiece", status: "Sold Out", img: "/products/Italian-style town.jpg" },
    { id: 12, title: "Custom Ghibli Style", price: 3499, size: "6x8", cat: "Commission", status: "Waitlist", img: "/products/Customized Ghibli Art Style.jpg" },
    { id: 13, title: "Sunset Love", price: 4999, size: "12x16", cat: "Masterpiece", status: "Sold Out", img: "/products/Sunset Love Landscape Art.jpg" }
];

export const REVIEWS = [
    {
        id: 1,
        user: "Aarav P.",
        role: "Art Collector",
        text: "The texture is unbelievable. I find myself staring at the 'Italian Town' piece for hours. It brings such a warm, nostalgic energy to my study.",
        rating: 5
    },
    {
        id: 2,
        user: "Meera S.",
        role: "Interior Designer",
        text: "I commissioned a Ghibli-style portrait for my sister's wedding. The team captured the emotion perfectly. The process was transparent and the result—magical.",
        rating: 5
    },
    {
        id: 3,
        user: "Rohan K.",
        role: "Verified Buyer",
        text: "Awanti Art isn't just selling paintings; they are selling feelings. Packaged with care and arrived fast.",
        rating: 4
    }
];
