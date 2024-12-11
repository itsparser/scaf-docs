import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { TemplateService } from "@/services/template.service";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || undefined;

    const result = await TemplateService.getTemplates({
      page,
      limit,
      search,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error fetching templates:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const headersList = await headers();
    const userId = headersList.get("x-user-id");
    const userEmail = headersList.get("x-user-email");
    const userName = headersList.get("x-user-name");

    if (!userId || !userEmail) {
      return NextResponse.json(
        { error: "User information not found" },
        { status: 401 }
      );
    }

    const body = await request.json();
    let { name, description, _id } = body;

    if (_id && !_id.startsWith(userId)) {
      _id = `${userId}/${_id}`;
    }

    if (!name || !_id) {
      return NextResponse.json(
        { error: "Name and id are required" },
        { status: 400 }
      );
    }

    const template = await TemplateService.createTemplate({
      _id,
      name,
      description,
      createdBy: {
        uid: userId,
        email: userEmail,
        displayName: userName || undefined,
      },
    });

    return NextResponse.json({ template }, { status: 201 });
  } catch (error) {
    console.error("Error creating template:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
