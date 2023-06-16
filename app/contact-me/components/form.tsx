'use client'
import React, { useState } from 'react'

const Form = () => {
  const [isMessageSent, setMessageSent] = useState<boolean>(false)

  const [nameField, setNameField] = useState<string>('')
  const [companyField, setCompanyField] = useState<string>('')
  const [emailField, setEmailField] = useState<string>('')
  const [messageField, setMessageField] = useState<string>('')

  const handleChangeName = (e: React.FormEvent<HTMLInputElement>) =>
    setNameField(e.currentTarget.value)

  const handleChangeCompany = (e: React.FormEvent<HTMLInputElement>) =>
    setCompanyField(e.currentTarget.value)

  const handleChangeEmail = (e: React.FormEvent<HTMLInputElement>) =>
    setEmailField(e.currentTarget.value)

  const handleChangeMessage = (e: React.FormEvent<HTMLTextAreaElement>) =>
    setMessageField(e.currentTarget.value)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const target = e.currentTarget

    const name = target.elements.namedItem('name') as HTMLInputElement
    const company = target.elements.namedItem('company') as HTMLInputElement
    const email = target.elements.namedItem('email') as HTMLInputElement
    const message = target.elements.namedItem('message') as HTMLTextAreaElement

    const data = {
      name: name.value,
      company: company.value,
      email: email.value,
      message: message.value,
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      setMessageSent(true)
      setNameField('')
      setCompanyField('')
      setEmailField('')
      setMessageField('')
    } catch (error: any) {
      console.log(
        `There was a problem with the fetch operation ${error.message}`
      )
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-white p-10">
        <div className="mb-4">
          <label className="label-form" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={nameField}
            onChange={handleChangeName}
            className="input-form"
            required
            minLength={3}
            maxLength={200}
          />
        </div>

        <div className="mb-4">
          <label className="label-form" htmlFor="company">
            Company
          </label>
          <input
            id="company"
            type="text"
            name="company"
            value={companyField}
            onChange={handleChangeCompany}
            className="input-form"
            minLength={2}
            maxLength={200}
          />
        </div>

        <div className="mb-4">
          <label className="label-form" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={emailField}
            onChange={handleChangeEmail}
            className="input-form"
            required
            minLength={2}
            maxLength={200}
          />
        </div>

        <div className="mb-4">
          <label className="label-form" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={messageField}
            onChange={handleChangeMessage}
            className="input-form"
            required
            minLength={10}
            maxLength={1000}
          />
        </div>
        <button type="submit" className="form-button">
          Send Message
        </button>
      </form>
      {isMessageSent && <p>Message has been sent</p>}
    </>
  )
}

export default Form
