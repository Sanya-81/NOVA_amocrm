<template>

 <table class="overflow">
    <thead>
        <tr>
            <th v-for="key in thCell"
                :key="key"> 
            {{ key }}</th></tr></thead>
    <tbody>
        <tr 
            v-for="entry in tebleData"
            :key="entry">
            <td 
                v-for="key in thCell"
                :key="key"> 
            {{ entry[key] }}</td></tr></tbody>
</table>

</template>

<script>
export default {
    props: {
        tebleData: Array,
        thCell: Array,
    },
}
</script>

<style scoped>
    table {
        border: 2px solid var(--blue100);
        border-radius: 3px;
        background-color: var(--grey0);
    }

    th {
        background-color: var(--green800);
        color: var(--grey0);
        letter-spacing: .1em;
    }

    td {
        background-color: var(--green100);
    }

    th,
    td {
        min-width: 120px;
        padding: 10px 20px;
    }
</style>