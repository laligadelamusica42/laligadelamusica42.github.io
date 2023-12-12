"use client"
import EmailTemplateV1 from '@/templates/email/EmailTemplateV1'
import React from 'react'

const page = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <EmailTemplateV1 fullname={user?.name + user?.lastname} event_name={`Masterclass Producción Musical`} body={`Anal Sex`}/>
    </div>
  )
}

export default page
