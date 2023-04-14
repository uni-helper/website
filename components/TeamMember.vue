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
if (members.value) {
  members.value?.forEach(async (member) => {
    const extra = await getExtraInfo(member.username)
    Object.assign(member, extra)
  })
}

async function getExtraInfo(username: string) {
  const { data } = await useFetch<MemberExtra>(
    `https://api.github.com/users/${username}`,
    {
      transform: (res: any) => ({
        name: res.name,
        twitter: res.twitter_username,
        bio: res.bio,
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
    <template v-for="member, _idx of members" :key="_idx">
      <div text-center>
        <img
          loading="lazy" width="100" height="100" m-auto h-25 min-h-25 min-w-25 w-25 rounded-full :src="member.avatar"
          :alt="member.name"
        >
        <div mb-1 mt-2 text-xl>
          {{ member.name }}
        </div>
        <div h-40px op60>
          {{ member.bio }}
        </div>
        <div flex="~ inline gap-2" py-2>
          <a
            class="i-carbon-logo-github mya inline-block text-current op30 transition duration-200 hover:text-primary hover:op100"
            :href="member.htmlUrl" target="_blank" rel="noopener noreferrer" :aria-label="`${member.name} on GitHub`"
          />
          <a
            class="i-carbon-logo-twitter mya inline-block text-current op30 transition duration-200 hover:text-primary hover:op100"
            :href="`https://twitter.com/${member.twitter}`" target="_blank" rel="noopener noreferrer"
            :aria-label="`${member.name} on Twitter`"
          />
        </div>
      </div>
    </template>
  </div>
</template>
