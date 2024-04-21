import BrandModel, { NewBrand } from "@/app/models/BrandeModel";
import { NewBrandInfo } from "@/app/types";
import { uploadImage } from "@/app/utils/helper";
import startDb from "@lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { brand, logo, category } = (await req.json()) as NewBrandInfo;
    await startDb();
    const logoRes = await uploadImage(logo!);

    await BrandModel.create({
      brandName: brand,
      category: category,
      logo: logoRes,
    });

    return NextResponse.json({ message: "New Branch add successfully!." });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Could not add brand, something went wrong!",
      },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    await startDb();

    const brandes = await BrandModel.find();
    if (!brandes)
      return NextResponse.json(
        {
          error: "Do not have any brand here!",
        },
        { status: 401 }
      );
    return NextResponse.json({ brandes });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Could not find any brand, something went wrong!",
      },
      { status: 500 }
    );
  }
};
