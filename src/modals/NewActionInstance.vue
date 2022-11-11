<template>
	<b-modal centered id="new-mining-modal" title="New Action Instance">
		<table class="table table-borderless text-center" style="font-size: 0.85rem">
			<tr>
				<td class="text-nowrap rounded" :class="wizardStep == 1 ? 'bg-warning' : 'text-muted'">1. Miner</td>
				<td class="text-nowrap rounded" :class="wizardStep == 2 ? 'bg-warning' : 'text-muted'">2. Inputs</td>
				<td class="text-nowrap rounded" :class="wizardStep == 3 ? 'bg-warning' : 'text-muted'">
					3. Parameters
				</td>
				<td class="text-nowrap rounded" :class="wizardStep == 4 ? 'bg-warning' : 'text-muted'">
					4. Repository
				</td>
			</tr>
		</table>
		<hr />
		<form ref="form" @submit.stop.prevent="">
			<div v-if="wizardStep == 1">
				<p>Select the action to use:</p>
				<b-form-group class="mt-3">
					<ActionsDropdown :current="this.miner" @selected="(m) => (this.miner = m)" />
					<b-form-invalid-feedback :state="miner.id !== ''">
						An action has to be selected
					</b-form-invalid-feedback>
				</b-form-group>
			</div>
			<div v-if="wizardStep == 2">
				<p v-if="Object.keys(miner.input).length == 0">
					<em>The selected action does not require any input.</em>
				</p>
				<div v-else>
					<p>Configure the input for the mining algorithm:</p>
					<b-form-group class="mt-3" :label="name" v-bind:key="name" v-for="(obj, name) in miner.input">
						<ResourceDropdown
							:current="inputs[name]"
							:type="obj.name"
							@selected="(m) => (inputs[name] = m)"
						/>
					</b-form-group>
				</div>
			</div>
			<div v-if="wizardStep == 3">
				<p v-if="Object.keys(miner.parameters).length == 0">
					<em>The selected action does not require any input.</em>
				</p>
				<div v-else>
					<p>Configure the parameters:</p>
					<b-form-group
						v-bind:key="p.name"
						v-for="p in miner.parameters"
						:label="p.name + ' (' + p.type.toLowerCase() + '):'"
					>
						<b-form-input
							:type="p.type.toLowerCase() == 'string' ? 'text' : 'number'"
							v-model="parameters[p.name]"
						></b-form-input>
					</b-form-group>
				</div>
			</div>
			<div v-if="wizardStep == 4">
				<b-form-group label="Select the destination repository">
					<b-form-select v-model="repository" :options="repositories" required></b-form-select>
				</b-form-group>
			</div>
		</form>
		<template #modal-footer>
			<div class="w-100">
				<b-button variant="outline-secondary" class="float-left" v-if="wizardStep > 1" @click="wizardStep--">
					Previous
				</b-button>
				<b-button variant="primary" class="float-right" v-if="wizardStep < 4" @click="wizardStep++">
					Next
				</b-button>
				<b-button variant="primary" class="float-right" v-if="wizardStep == 4" @click="handleSubmit">
					Confirm and close
				</b-button>
			</div>
		</template>
	</b-modal>
</template>

<script>
import { MinerService } from "../services/miner";
import ActionsDropdown from "../widgets/ActionsDropdown.vue";
import ResourceDropdown from "../widgets/ResourceDropdown.vue";
import axios from "axios";

export default {
	name: "NewActionInstance",
	components: { ActionsDropdown, ResourceDropdown },
	data() {
		return {
			wizardStep: 1,
			miner: {
				id: "",
				name: "",
				host: "",
				input: {},
				parameters: [],
			},
			inputs: {},
			parameters: {},
			repository: "",
		};
	},
	computed: {
		repositories() {
			var m = this.$store.getters.getHostsRepository.map((str) => ({
				text: str.name,
				value: str.name,
			}));
			this.repository = m[0].value;
			return m;
		},
	},
	methods: {
		handleSubmit() {
			var configuration = {
				miner: this.miner,
				inputs: this.inputs,
				parameters: [],
				repository: this.repository,
			};
			for (const param in this.parameters) {
				configuration.parameters.push({ name: param, value: this.parameters[param] });
			}
			this.$bvToast.toast("Action started...", {
				title: "Action started",
				variant: "info",
				solid: true,
			});
			axios.post(MinerService.buildNewMinerInstanceUrl(this.miner.host), configuration).then(() => {
				this.$bvToast.toast("Action completed correctly", {
					title: "Action complete",
					variant: "success",
					solid: true,
				});
			});
		},
		reset() {
			this.wizardStep = 1;
		},
	},
	mounted() {
		this.$root.$on("bv::modal::show", () => {
			this.reset();
		});
	},
};
</script>

<style scoped></style>
