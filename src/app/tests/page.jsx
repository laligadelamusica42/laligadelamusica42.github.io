'use client'
import React, {useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid';

const test = () => {
  describe('JSON data', () => {
    it('should have the correct structure and content', () => {
      const user = {
        name: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com',
        intra: 'jdoe'
      };
      const skills = {
        skills: 'JavaScript,React'
      };
      const eventId = 'event1';
      const userId = uuidv4().toString();
      let formData = {
        "id": userId,
        "fullname": `${user?.name} ${user?.lastname}`,
        "email": user?.email,
        "intraname": user?.intra,
        "skills": skills?.skills,
        "eventId": eventId
      };
  
      expect(formData).toEqual({
        id: expect.any(String),
        fullname: 'John Doe',
        email: 'john.doe@example.com',
        intraname: 'jdoe',
        skills: 'JavaScript,React',
        eventId: 'event1'
      });
    });
  });
}

const page = () => {
    useEffect(() => {
        console.log('page loaded');
        console.log(test());
    }, []);
  return (
    <div>
      
    </div>
  )
}

export default page
