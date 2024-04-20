import BrandModel from "@/app/models/BrandModel";
import { NewBranchRequest } from "@/app/types";
import startDb from "@lib/db";
import { NextResponse } from "next/server";

// export const POST = async (req: Request) => {
//   try {
//     const body = (await req.json()) as NewBranchRequest;
//     await startDb();

//     await BrandModel.create({
//       brandName: body.brandName,
//       category: body.category,
//     });

//     return NextResponse.json({ message: "New Branch add successfully!." });
//   } catch (error) {
//     return NextResponse.json(
//       {
//         error: "Could not add brand, something went wrong!",
//       },
//       { status: 500 }
//     );
//   }
// };

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
