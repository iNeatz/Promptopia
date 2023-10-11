'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

import Profile from '@components/Profile'

const UserProfile = ({ params }) => {
	const [userPosts, setUserPosts] = useState([])
	const [userName, setUserName] = useState('')

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch(`/api/users/${params?.id}/posts`)
			const data = await response.json()

			setUserPosts(data)
			setUserName(data[0].creator.username)
		}

		fetchPosts()
	}, [])

	return (
		<>
			{userName ? (
				<Profile
					name={userName}
					desc={`Welcome to ${userName}'s profile page`}
					data={userPosts}
				/>
			) : (
				<Image src={'/assets/icons/loader.svg'} width={50} height={50} />
			)}
		</>
	)
}

export default UserProfile
