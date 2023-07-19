import React from "react"
import { NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose"
import Message from '@/models/Message'

export async function POST(req: NextRequest, res: NextResponse) {
  let client

  try {
    client = await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI || '')
    console.log("DB connected")

  } catch(error) {
    console.log('There was an error connection to the DB', error)
  }

  const data = await req.json()
  const {name, email, company, message} = data

  if(!name || !company || !email  || !message || !email.includes('@') || message.trim() === "" || name.trim() === "") {
    NextResponse.json({message: "Invalid input - fill all the fields"}, {status:422})
    return
  }

  const newData = {...data, date: new Date()}

  try {
    await Message.create(newData)
    console.log("Message Sent")
    return NextResponse.json({message: "Message sent"}, {
      status: 201,
    })

  } catch(error) {
    console.log("Message couldn't be sent", error)
    return NextResponse.json({message: 'Error sending the message'}, {status: 500})
  }




}