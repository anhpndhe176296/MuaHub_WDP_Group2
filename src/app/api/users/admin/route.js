import clientPromise from "@muahub/lib/mongodb";
import { NextResponse } from "next/server";

// PATCH: Tổng hợp lại tổng tiền và còn lại cho admin dựa trên các giao dịch
export async function PATCH(req) {
	try {
		const client = await clientPromise;
		const dbAccounts = client.db("accounts");
		const dbServices = client.db("services");
		const usersCollection = dbAccounts.collection("users");
		const ordersCollection = dbServices.collection("orders");

		
		

		

		

			return NextResponse.json({
				success: true,
				message: "Đã cập nhật tổng quan tài chính cho admin",
				totalPrice,
				remaining,
				admin: {
					id: admin._id,
					email: admin.email,
					name: admin.name
				}
			});
	} catch (error) {
		return NextResponse.json({ success: false, error: error.message }, { status: 500 });
	}
}



