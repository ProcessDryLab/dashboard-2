<template>
	<b-dropdown
		:text="this.miner.name == '' ? 'Select miner' : 'Selected miner: ' + this.miner.name"
		block
		variant="outline-secondary"
	>
		<b-dropdown-item
			v-bind:key="m.id"
			v-for="m in this.$store.getters.getMiners"
			@click="
				miner = m;
				$emit('selected', miner);
			"
			style="font-size: 0.85em"
		>
			<b-icon icon="gear-wide-connected" /> {{ m.name }}<br />
			<small>
				<code>{{ m.host }}</code>
			</small>
		</b-dropdown-item>
	</b-dropdown>
</template>

<script>
export default {
	name: "MinersDropdown",
	props: ["current"],
	data() {
		return {
			miner: {},
		};
	},
	mounted() {
		this.$nextTick(() => {
			this.miner = this.current;
		});
	},
};
</script>
