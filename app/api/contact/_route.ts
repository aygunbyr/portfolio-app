import { NextRequest, NextResponse } from "next/server";
const fs = require("fs")
const path = require("path")

export async function POST(request: NextRequest) {
    const data = await request.json()

    // READ DB - JSON File

    const filePath = path.resolve(process.cwd(), 'app/data/submission.json')

    let submissions: any = []

    try {
        const data = fs.readFileSync(filePath, 'utf8', )
        submissions = JSON.parse(data)
    } catch(error) {
        console.error("Error reading this file", error)
    }

    submissions.push(data)

    try {
        const newData = JSON.stringify(submissions, null, 2)
        fs.writeFileSync(filePath, newData, "utf8")
    } catch(error) {
        console.error("Error writing this file", error)
    }

    return NextResponse.json({
        data: data,
        message: "This message has been successfully sent"
    })



    // Parse the JSON + add the new data + write in JSON file again

}

// export async function GET() {
//     return NextResponse.json({
//         message: "It's time to Code!!"
//     })
// }