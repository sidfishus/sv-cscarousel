
<script lang="ts">
    import TestChikd from "./TestChikd.svelte";

    let globalIdx = $state<number>(0);

    const array=[];
    for(let i=0;i<500;++i) {
        array.push(i);
    }

    const getIgnoreIdx = () => {
        if(globalIdx === 0) return 0;
        return parseInt(globalIdx / 10);
    }

    let ignoreIdx=$derived(getIgnoreIdx());
</script>

<div>
    <button onclick={()=>globalIdx++}>Update</button>
</div>

<div>
    {#each array as iter, idx}
        <TestChikd idx={idx} show={idx !== ignoreIdx} />
    {/each}
</div>