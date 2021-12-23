<template>
 <table>
    <thead>
        <tr>
            <th v-for="key in thCell"
                :key="key"
            > {{ key }} </th>
        </tr>
    </thead>
    <tbody>
        <tr 
            v-for="entry in tebleData"
            :key="entry" 
        >   <td 
                v-for="key in thCell"
                :key="key"
            > {{ entry[key] }} </td>
        </tr>
    </tbody>
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
