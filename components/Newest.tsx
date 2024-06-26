import Link from "next/link";
import { simplifiedProduct } from "../app/interface";
import { client } from "../lib/sanity";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
async function getData() {
    const query = `*[_type == "product"][0...4] | order(_createdAt asc)
    {
        _id,
        price,
        name,
        "slug":slug.current,
        "categoryName":category->name,
        "imageUrl":images[0].asset->url
      }`;

    const data = await client.fetch(query);
    return data;
}

export default async function newest() {
    const data: simplifiedProduct[] = await getData();

    return (
        <div className="bg-secondary-100">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Our Bakery</h1>
                    <Link className="text-primary flex items-center gap-x-1" href="/bakery">See all <span><ArrowRight /></span> </Link>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {data.map((product) => (
                        <div key={product._id} className="relative">
                            <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 hover:opactiy-75 lg:h-80">
                                <Image className="w-full h-full object-cover object-center lg:h-full lg:w-full" src={product.imageUrl}
                                    width={300}
                                    height={300}
                                    alt="product Image" />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-700 ">
                                        <Link href={`/product/${product.slug}`}>{product.name}</Link>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">{product.categoryName}</p>
                                </div>
                                <p>Rs{product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}