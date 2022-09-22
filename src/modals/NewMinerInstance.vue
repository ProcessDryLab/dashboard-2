<template>
	<b-modal centered id="new-mining-modal" title="New Mining Instance">
		<form ref="form" @submit.stop.prevent="">
			<div v-if="wizardStep == 1">
				<h6>Select Miner</h6>
				<b-form-group class="mt-3">
					<b-dropdown
						:text="this.miner.name == '' ? 'Select miner' : 'Selected Miner: ' + this.miner.name"
						block
						variant="outline-secondary"
					>
						<b-dropdown-item
							class="py-2"
							v-bind:key="m.id"
							v-for="m in this.$store.getters.getMiners"
							@click="
								miner.id = m.id;
								miner.name = m.name;
								miner.host = m.host;
							"
						>
							<b-icon icon="gear-wide-connected" /> {{ m.name }}<br />
							<small>
								<code>{{ m.host }}</code>
							</small>
						</b-dropdown-item>
					</b-dropdown>
					<b-form-invalid-feedback :state="miner.id !== ''">
						A miner has to be selected
					</b-form-invalid-feedback>
				</b-form-group>
			</div>
			<div v-if="wizardStep == 2">
				<h6>Select Input</h6>
			</div>
			<div v-if="wizardStep == 3">
				<h6>Select Parameters</h6>
			</div>
			<div v-if="wizardStep == 4">
				<h6>Select Destination Repository</h6>
			</div>
		</form>
		<template #modal-footer>
			<div class="w-100">
				<b-button variant="secondary" class="float-left" v-if="wizardStep > 1" @click="wizardStep--">
					Previous
				</b-button>
				<b-button variant="primary" class="float-right" v-if="wizardStep < 4" @click="wizardStep++">
					Next
				</b-button>
				<b-button variant="primary" class="float-right" v-if="wizardStep == 4" @click="wizardStep++">
					Ok
				</b-button>
			</div>
		</template>
	</b-modal>
</template>

<script>
export default {
	name: "NewMinerInstance",
	data() {
		return {
			wizardStep: 1,
			miner: {
				id: "",
				name: "",
				host: "",
			},
		};
	},
};
</script>

<style scoped></style>
