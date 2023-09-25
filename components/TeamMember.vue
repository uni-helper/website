<script lang="ts" setup>
import type { Member, MemberExtra } from '~/types'

const { data: members } = await useFetch<Member[]>(
  'https://api.github.com/orgs/uni-helper/members',
  {
    transform: (res: any) => {
      return res.map((m: any) => ({
        username: m.login,
        avatar: m.avatar_url,
        url: m.url,
        htmlUrl: m.html_url,
      }))
    },
  },
)

watch(members, () => {
  if (members.value) {
    members.value?.forEach(async (member) => {
      const extra = await getExtraInfo(member.username)
      Object.assign(member, extra)
    })
    // random sort
    members.value.sort(() => Math.random() - 0.5)
  }
})

async function getExtraInfo(username: string) {
  const { data } = await useFetch<MemberExtra>(
    `https://api.github.com/users/${username}`,
    {
      transform: (res: any) => ({
        login: res.login,
        name: res.name,
        twitter: res.twitter_username,
        bio: res.bio,
        blog: res.blog,
      }),
    },
  )
  return unref(data)
}
</script>

<template>
  <div pb-2 pt-10 text-center text-xl font-normal op50>
    Meet The Team
  </div>
  <div grid="~ sm:cols-2 md:cols-3 lg:cols-4 gap-x-3 gap-y-20 items-center" p-10>
    <template v-for="member of members" :key="member.username">
      <TeamMemberItem :member="member" />
    </template>
  </div>
</template>
