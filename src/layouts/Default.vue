<template>
    <div class="min-h-screen">
        <TheHeader />

        <div class="px-5 py-5">
            <RouterView />
        </div>
    </div>
</template>

<script>
    import TheHeader from '@/components/Partials/TheHeader';

    export default {
        name: 'Default',

        components: {
            TheHeader,
        },

        data() {
            return {
            };
        },

        methods: {},
    };
</script>
