<template>
	<b-modal centered id="new-host-modal" title="New Host" @ok="handleOk">
		<form ref="form" @submit.stop.prevent="handleSubmit">
			<ValidatedInputText
				label="Hostname:"
				placeholder="http://miner.host.net"
				error="Enter the new host (examples: <code>http://miner.host.net</code> or <code>https://repository.host.net</code>)"
				type="text"
				v-model="hostname"
				:state="validateState('hostname')"
			/>
			<b-form-group label="Host type:">
				<b-form-select v-model="type" :options="types" required></b-form-select>
			</b-form-group>
		</form>
	</b-modal>
</template>

<script>
import ValidatedInputText from "../widgets/ValidatedInputText.vue";
import { required, helpers } from "vuelidate/lib/validators";
const host = helpers.regex(
	"host",
	/^https?:\/\/((?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9]{0,61}[a-z0-9]|localhost)(:\d{0,5})?$/i
);

export default {
	name: "NewHostModal",
	components: {
		ValidatedInputText,
	},
	data: () => ({
		hostname: "",
		type: "miner",
		types: [
			{ value: "miner", text: "Miner host" },
			{ value: "repository", text: "Repository host" },
		],
	}),
	validations: {
		hostname: {
			required,
			host,
		},
	},
	methods: {
		validateState(name) {
			const { $dirty, $error } = this.$v[name];
			return $dirty ? !$error : null;
		},
		handleSubmit() {
			this.$v.$touch();
			if (this.$v.$anyError) {
				return;
			}
			this.$store.commit("addHost", { type: this.type, host: this.hostname });
			this.$nextTick(() => {
				this.$bvModal.hide("new-host-modal");
			});
		},
		handleOk(bvModalEvt) {
			bvModalEvt.preventDefault();
			this.handleSubmit();
		},
	},
};
</script>
