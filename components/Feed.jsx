'use client'

import { useState, useEffect } from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {
	return (
		<div className='mt-16 prompt_layout'>
			{data.map((post) => (
				<PromptCard
					key={post._id}
					post={post}
					handleTagClick={handleTagClick}
				/>
			))}
		</div>
	)
}

const Feed = () => {
	const [posts, setPosts] = useState([])

	const [searchText, setSearchText] = useState('')
	const [searchedResults, setSearchedResults] = useState([])

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch('/api/prompt')
			const data = await response.json()

			setPosts(data)
		}

		fetchPosts()
	}, [])

	const filterPrompts = (searchtext) => {
		const regex = new RegExp(searchtext, 'i')
		return posts.filter(
			(item) =>
				regex.test(item.creator.username) ||
				regex.test(item.prompt) ||
				regex.test(item.tag)
		)
	}

	const handleSearchChange = (e) => {
		setSearchText(e.target.value)
		
		const searchResult = filterPrompts(e.target.value)
		setSearchedResults(searchResult)
	}

	const handleTagClick = (tagName) => {
		setSearchText(tagName)

		const searchResult = filterPrompts(tagName)
		setSearchedResults(searchResult)
	}

	return (
		<section className='feed'>
			<form className='relative w-full flex-center'>
				<input
					type='text'
					placeholder='Search for a tag or a username'
					value={searchText}
					onChange={handleSearchChange}
					required
					className='search_input peer'
				/>
			</form>

			<PromptCardList
				data={searchedResults.length > 0 ? searchedResults : posts}
				handleTagClick={handleTagClick}
			/>
		</section>
	)
}

export default Feed
