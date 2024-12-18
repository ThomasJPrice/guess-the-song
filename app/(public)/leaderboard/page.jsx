import Leaderboard from '@/components/shared/Leaderboard'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import React from 'react'

export const metadata = {
  title: 'Leaderboard | 5 Second Song',
  description: 'Explore the 5 Second Song leaderboard! See top players, fastest times, and highest scores. Can you beat the best and climb to the top?'
}

const LeaderboardPage = async () => {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: results } = await supabase.from('results').select().order('score', { ascending: false }).order('time', { ascending: true })

  return (
    <div className='container py-4 overflow-hidden'>
      <h1 className="font-primary text-center text-4xl md:text-5xl text-primary">Leaderboard</h1>

      <Leaderboard entries={results} />
    </div>
  )
}

export default LeaderboardPage