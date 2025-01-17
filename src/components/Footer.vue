<template>
  <footer class="footer w-full mt-20">
    <div class="p-8 pb-0">
      <div class="lg:flex justify-evenly items-center">
        <div class="lg:w-1/3">
          <div class="flex">
            <Logo />
          </div>
          <div class="my-8">
            <p class="text-justify">
              {{ $t('footer.description') }}
            </p>
            <div class="mt-4">
              <nuxt-link to="/contact" class="text-red-400 border-b-2 border-gray-200 dark:border-gray-700 hover:border-red-400 duration-300">
                {{ $t(hiring_message) }}
              </nuxt-link>
            </div>
          </div>
          <div class="social-links flex space-x-4 mb-8">
            <a target="_blank" href="https://twitter.com/ArthurDanj" rel="noopener noreferrer">
              <TwitterIcon />
            </a>
            <a target="_blank" href="https://github.com/ArthurDanjou" rel="noopener noreferrer">
              <GithubIcon />
            </a>
            <a target="_blank" href="https://www.polywork.com/arthurdanjou" rel="noopener noreferrer">
              <PolyworkIcon />
            </a>
            <a target="_blank" href="https://www.twitch.tv/arthurdanjou" rel="noopener noreferrer">
              <TwitchIcon />
            </a>
            <a target="_blank" href="https://discord.gg/ENG6cFQhPS" rel="noopener noreferrer">
              <DiscordIcon />
            </a>
            <a target="_blank" href="mailto:contact@arthurdanjou.fr" rel="noopener noreferrer">
              <MailIcon />
            </a>
          </div>
        </div>
        <div class="lg:ml-32 lg:w-1/3">
          <h1 class="font-bold mb-4 text-lg underline">
              {{ $t('footer.links') }}
            </h1>
          <div class="flex flex-col lg:flex-row mb-8 font-medium">
            <div class="space-y-2 lg:space-y-4 mr-16">
              <div class="link">
                <nuxt-link to="/" :class="{'link-active': isWindow('')}">
                  {{ $t('header.home') }}
                </nuxt-link>
              </div>
              <div class="link">
                <nuxt-link to="/about" :class="{'link-active': isWindow('about')}">
                  {{ $t('header.about') }}
                </nuxt-link>
              </div>
              <div class="link">
                <nuxt-link to="/blog" :class="{'link-active': isWindow('blog')}">
                  {{ $t('header.blog') }}
                </nuxt-link>
              </div>
              <div class="link">
                <nuxt-link to="/projects" :class="{'link-active': isWindow('projects')}">
                  {{ $t('header.projects') }}
                </nuxt-link>
              </div>
            </div>
            <div class="space-y-2 lg:space-y-4 ">
              <div class="link">
                <nuxt-link to="/services" :class="{'link-active': isWindow('services')}">
                  {{ $t('header.services') }}
                </nuxt-link>
              </div>
              <div class="link">
                <nuxt-link to="/env" :class="{'link-active': isWindow('env')}">
                  {{ $t('header.env') }}
                </nuxt-link>
              </div>
              <div class="link">
                <nuxt-link to="/newsletter" :class="{'link-active': isWindow('newsletter')}">
                  {{ $t('header.newsletter') }}
                </nuxt-link>
              </div>
              <div class="link">
                <nuxt-link to="/contact" :class="{'link-active': isWindow('contact')}">
                  {{ $t('header.contact') }}
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center border-t-2 border-gray-200 dark:border-gray-800 py-8 lg:flex lg:flex-row-reverse justify-between">
        <div>
          {{ $t('footer.credits') }}
          <a class="social font-semibold" target="_blank" href="https://nuxtjs.org" rel="noopener noreferrer">
            <NuxtIcon />
            <span>NuxtJS</span>
          </a>
          {{ $t('footer.credits_separator') }}
          <a class="social font-semibold" target="_blank" href="https://adonisjs.com" rel="noopener noreferrer">
            <AdonisIcon />
            <span>AdonisJS</span>
          </a>
        </div>
        <p class="mt-4 lg:mt-0">{{ $t('footer.copyrights', { date: getDate }) }}</p>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import {computed, defineComponent, ref, useAsync, useContext, useRouter, useStore} from "@nuxtjs/composition-api";
import {State} from "~/types/types";

export default defineComponent({
  name: "Footer",
  setup() {
    const {$colorMode, $axios, $sentry, app} = useContext()
    const isDarkMode = computed(() => {
      return $colorMode.preference === 'dark'
    })

    const getDate = ref(new Date().getFullYear())

    const hiring_message = useAsync(async () => {
      const request = await $axios.get('/api/informations', {
        headers: {
          'Authorization': `Bearer ${process.env.API_TOKEN}`
        }
      })
      if (request.status === 200) {
        return request.data.informations.translation.code
      } else {
        app.error({statusCode: 500})
        $sentry.captureEvent(request.data)
      }
    }, 'hiring_message')

    const store = useStore<State>()
    const route = computed(() => store.state.route)
    const isWindow = (loc: string) => {
      if (loc === '') return route.value === "/"
      else return route.value.includes(loc)
    }

    return {
      getDate,
      isDarkMode,
      hiring_message,
      isWindow
    }
  }
})
</script>

<style scoped lang="scss">
.footer {
  .social {
    span {
      @apply border-b-2 border-gray-200 dark:border-gray-700 duration-300;
    }
    &:hover span {
      @apply border-indigo-600
    }
  }
  .link-active a {
    @apply text-indigo-600;
  }

  .social-links a {
    svg {
      @apply h-6 w-6 duration-300
    }

    &:hover svg {
      @apply transform hover:scale-120
    }
  }

  .link a {
    @apply duration-500 border-b-2 border-transparent;

    &.link-active {
      @apply text-indigo-600;
    }

    &:hover {
      @apply border-indigo-600
    }
  }
}
</style>
