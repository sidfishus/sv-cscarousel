
<script lang="ts">
    let { show, idx } : {show: boolean, idx: number} = $props();
</script>


{#if show}
    <div>{idx}</div>
{/if}