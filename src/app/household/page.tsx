"use client";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  getUserByEmail,
  storeHouseholdData as saveHouseholdData,
} from "@/utils/db/actions";

import { Upload } from "lucide-react";
import { useState, ChangeEvent, useEffect } from "react";

interface CartItem {
  name: string;
  price: number;
  weight: number;
  category: string;
}

const categories = [
  { name: "Newspaper", price: 5 },
  { name: "Cardboard", price: 7 },
  { name: "Plastic", price: 3 },
  { name: "Glass", price: 4 },
  { name: "Metal", price: 6 },
];

const HouseholdPage: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [photo, setPhoto] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [userName, setUserName] = useState<string>("");
  const [userPhone, setUserPhone] = useState<string>("");
  const [pickupDate, setPickupDate] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    const checkUser = async () => {
      const email = localStorage.getItem("userEmail");
      if (email) {
        try {
          const userData = await getUserByEmail(email);
          if (userData) {
            setUser(userData);
          } else {
            console.warn("User not found");
          }
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };
    checkUser();
  }, []);

  const addItemToCart = (category: string, price: number) => {
    const existingItem = cart.find((item: any) => item.category === category);
    if (existingItem) {
      const updatedCart = cart.map((item: any) =>
        item.category === category
          ? { ...item, weight: item.weight + 1, price: item.price + price }
          : item
      );
      setCart(updatedCart);
    } else {
      const newItem: CartItem = {
        name: `${category} 1kg`,
        price,
        weight: 1,
        category,
      };
      setCart([...cart, newItem]);
    }
  };

  const removeItemFromCart = (category: string, price: number) => {
    const existingItem = cart.find((item: any) => item.category === category);
    if (existingItem) {
      if (existingItem.weight > 1) {
        const updatedCart = cart.map((item: any) =>
          item.category === category
            ? { ...item, weight: item.weight - 1, price: item.price - price }
            : item
        );
        setCart(updatedCart);
      } else {
        const updatedCart = cart.filter(
          (item: any) => item.category !== category
        );
        setCart(updatedCart);
      }
    }
  };

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  const totalWeightByCategory = () => {
    return cart.reduce((acc: any, item: any) => {
      acc[item.category] = (acc[item.category] || 0) + item.weight;
      return acc;
    }, {} as Record<string, number>);
  };

  const totalPrice = cart.reduce((acc: any, item: any) => acc + item.price, 0);

  const handleSubmit = async () => {
    if (!user) {
      alert("User not found. Please log in.");
      return;
    }

    const userId = user.id;

    const formattedCart = cart.map((item: any) => ({
      userId,
      userName,
      userPhone,
      pickupDate,
      address,
      category: item.category,
      weight: item.weight,
      price: item.price,
      photoUrl: photo || null,
      isSubmitted: true,
    }));

    try {
      alert("data stored");
      await saveHouseholdData(formattedCart);
      setCart([]);
      setPhoto(null);
      setUserName("");
      setUserPhone("");
      setPickupDate("");
      setAddress("");
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Failed to store data:", error);
    }
  };

  return (
    <div className="p-4 bg-green-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-green-800">
        Household Dashboard
      </h1>

      <div className="flex flex-col lg:flex-row lg:space-x-6">
        {/* Form Section */}
        <form className="bg-white p-6 rounded-lg shadow-md mb-6 flex-1 border border-green-300">
          <h2 className="text-2xl font-semibold mb-4 text-green-700">
            Upload Waste Image
          </h2>
          <div className="mb-4">
            <div className="flex flex-col justify-center items-center border-2 border-dashed border-green-300 rounded-md p-6 hover:border-green-500 transition-colors duration-300">
              <Upload className="h-16 w-16 text-green-400" />
              <label className="block text-sm font-medium text-green-600 mt-4 cursor-pointer">
                <span>Upload a file</span>
                <input
                  type="file"
                  className="sr-only"
                  onChange={handlePhotoUpload}
                  accept="image/*"
                />
              </label>
              <p className="text-xs text-green-500 mt-2">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div>
          <p className="text-sm text-green-600 mt-4">
            Help us keep the environment clean by uploading images of waste for
            proper disposal.
          </p>
        </form>

        {/* Categories Section */}
        <div className="flex flex-col flex-1 bg-white p-6 rounded-lg shadow-md mb-6 border border-green-300">
          <h2 className="text-2xl font-semibold mb-4 text-green-700">
            Waste Categories
          </h2>
          <p className="text-sm text-green-600 mb-4">
            Categorize your waste to help us recycle and dispose of it properly.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category) => {
              const cartItem = cart.find(
                (item: any) => item.category === category.name
              );
              const quantity = cartItem ? cartItem.weight : 0;
              return (
                <div
                  key={category.name}
                  className="flex items-center justify-between border rounded p-4 bg-green-50 hover:bg-green-100 transition-colors duration-200"
                >
                  <span className="font-medium text-green-700">
                    {category.name} - {category.price} Rs
                  </span>
                  <div className="flex items-center">
                    <Button
                      onClick={() =>
                        addItemToCart(category.name, category.price)
                      }
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-200"
                    >
                      Add
                    </Button>
                    {quantity > 0 && (
                      <>
                        <span className="mx-2 text-green-700">{quantity}</span>
                        <Button
                          onClick={() =>
                            removeItemFromCart(category.name, category.price)
                          }
                          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-200"
                        >
                          Remove
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="text-center mt-6">
        <p className="text-green-700 font-semibold">
          "The Earth is what we all have in common." - Wendell Berry
        </p>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row md:space-x-6 border border-green-300">
        <div className="flex-1 mb-6 md:mb-0">
          <h3 className="text-xl font-semibold text-green-700 mb-4">
            Total Weight and Price
          </h3>
          <div className="text-green-700">
            <div className="mb-4">
              <h4 className="text-lg font-medium">Total Weight:</h4>
              <ul className="list-none mt-2">
                {Object.entries(totalWeightByCategory()).map(
                  ([category, weight]) => (
                    <li key={category} className="flex justify-between">
                      <span>{category}</span>
                      <span>{weight} kg</span>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div className="flex justify-between items-center mt-4">
              <span className="text-xl font-bold">
                Total Price: {totalPrice} Rs
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 flex-1">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={userName}
            onChange={(e: any) => setUserName(e.target.value)}
            placeholder="Enter your name"
            className="mb-4"
          />

          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            value={userPhone}
            onChange={(e: any) => setUserPhone(e.target.value)}
            placeholder="Enter your phone number"
            className="mb-4"
          />

          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            value={address}
            onChange={(e: any) => setAddress(e.target.value)}
            placeholder="Enter your address"
            className="mb-4"
          />

          <Label htmlFor="pickupDate">Pickup Date</Label>
          <Input
            id="pickupDate"
            type="date"
            value={pickupDate}
            onChange={(e: any) => setPickupDate(e.target.value)}
            className="mb-4"
          />

          <Button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-200"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HouseholdPage;
