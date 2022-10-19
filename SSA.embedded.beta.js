// refer: 
function SSA(opts) {
	return new (class {
		constructor(opts) {
			this.name = "SSA v0.1.0";
			this.opts = opts;
			this.newLine = (this.opts.includes("\n")) ? "\n" : (this.opts.includes("\r")) ? "\r" : (this.opts.includes("\r\n")) ? "\r\n" : "\n";
		};

		parse(ssa = new String) {
			$.log(`🚧 ${$.name}, parse SSA`, "");
			/***************** v0.7.0-beta *****************/
			const SSA_Regex = /^(?<TYPE>.+): (?<OPTION>.+)?$/;
			let json = ssa.replace(/\r\n/g, "\n").split(/[^][^]/).map(v => v.match(SSA_Regex)?.groups ?? v)
			$.log(`🚧 ${$.name}, parse SSA`, `json: ${JSON.stringify(json)}`, "");
			json = json.map(item => {
				$.log(`🚧 ${$.name}, parse SSA`, `before: item.OPTION.split(/,(?=[A-Z])/) ${JSON.stringify(item.OPTION?.split(/,(?=[A-Z])/) ?? "")}`, "");
				if (/=/.test(item?.OPTION) && this.opts.includes(item.TYPE)) item.OPTION = Object.fromEntries(item.OPTION.split(/,(?=[A-Z])/).map(item => item.split(/=(.*)/)));
				return item
			});
			$.log(`🚧 ${$.name}, parse SSA`, `json: ${JSON.stringify(json)}`, "");
			return json
		};

		stringify(json = new Array) {
			$.log(`🚧 ${$.name}, stringify SSA`, "");
			if (!json?.[0]?.includes("[Script Info]")) json.unshift("[Script Info]")
			let ssa = json.map(item => {
				if (typeof item?.OPTION == "object") item.OPTION = Object.entries(item.OPTION).map(item => item = item.join("=")).join(",");
				/***************** v0.7.0-beta *****************/
				return item = (item?.URI) ? item.TYPE + ":" + item.OPTION + this.newLine + item.URI
					: (item?.OPTION) ? item.TYPE + ":" + item.OPTION
						: (item?.TYPE) ? item.TYPE
							: item
			})
			ssa = ssa.join(this.newLine + "#")
			$.log(`🚧 ${$.name}, stringify SSA`, `ssa: ${ssa}`, "");
			return ssa
		};
	})(opts)
}
