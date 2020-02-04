import { addVerbSuffixes } from "../../../src/morphology/dutch/addVerbSuffixes";
import getMorphologyData from "../../specHelpers/getMorphologyData";

const morphologyDataNL = getMorphologyData( "nl" ).nl;

describe( "Test for getting the right verb suffixes depending on the stem ending", () => {
	it( "adds all verb suffixes for a stem that does not take the -te and -ten suffixes", () => {
		expect( addVerbSuffixes( "grond", morphologyDataNL.addSuffixes, morphologyDataNL.verbs ) ).toEqual( [
			"grondt",
			"grondde",
			"grondden",
			"gronden",
			"grondend",
		] );
	} );
	it( "adds all verb suffixes for a stem that does not take the -t, -de and -den suffixes", () => {
		expect( addVerbSuffixes( "muit", morphologyDataNL.addSuffixes, morphologyDataNL.verbs ) ).toEqual( [
			"muitte",
			"muitten",
			"muiten",
			"muitend",
		] );
	} );
	it( "adds all verb suffixes for a stem that does not take the -de and -den suffixes", () => {
		expect( addVerbSuffixes( "deuk", morphologyDataNL.addSuffixes, morphologyDataNL.verbs ) ).toEqual( [
			"deukt",
			"deukte",
			"deukten",
			"deuken",
			"deukend",
		] );
	} );
	it( "adds all verb suffixes for a stem that needs the final consonant doubled before adding the -en and -end suffixes", () => {
		expect( addVerbSuffixes( "zwik", morphologyDataNL.addSuffixes, morphologyDataNL.verbs ) ).toEqual( [
			"zwikt",
			"zwikte",
			"zwikten",
			"zwikken",
			"zwikkend",
		] );
	} );
	it( "adds all verb suffixes for a stem that does not need the final consonant doubled before adding the -en and -end suffixes", () => {
		expect( addVerbSuffixes( "treuzel", morphologyDataNL.addSuffixes, morphologyDataNL.verbs ) ).toEqual( [
			"treuzelt",
			"treuzelde",
			"treuzelden",
			"treuzelen",
			"treuzelend",
		] );
	} );
	it( "adds all verb suffixes for a stem that does not need the final consonant doubled before adding the -en and -end suffixes", () => {
		expect( addVerbSuffixes( "hamer", morphologyDataNL.addSuffixes, morphologyDataNL.verbs ) ).toEqual( [
			"hamert",
			"hamerde",
			"hamerden",
			"hameren",
			"hamerend",
		] );
	} );
	it( "Creates a second stem without doubling the last consonant and adds the right suffixes to each stem " +
		"Input: word ends in one of the words in the exception list (verb)", () => {
		expect( addVerbSuffixes( "adem", morphologyDataNL.addSuffixes, morphologyDataNL.verbs  ) ).toEqual( [
			"ademt",
			"ademde",
			"ademden",
			"ademen",
			"ademend",
		] );
	} );
	it( "adds all verb suffixes for a stem that needs the final consonant voiced before adding the -en and -end suffixes", () => {
		expect( addVerbSuffixes( "grief", morphologyDataNL.addSuffixes, morphologyDataNL.verbs ) ).toEqual( [
			"grieft",
			"griefte",
			"grieften",
			"grieven",
			"grievend",
		] );
	} );
	it( "adds all verb suffixes for a stem that should NOT have the consonant voiced before adding the -en and -end suffixes", () => {
		expect( addVerbSuffixes( "heers", morphologyDataNL.addSuffixes, morphologyDataNL.verbs ) ).toEqual( [
			"heerst",
			"heerste",
			"heersten",
			"heersen",
			"heersend",
		] );
	} );
	it( "adds all verb suffixes for a stem that should have a vowel undoubled before adding the -en and -end suffixes", () => {
		expect( addVerbSuffixes( "blaat", morphologyDataNL.addSuffixes, morphologyDataNL.verbs ) ).toEqual( [
			"blaatte",
			"blaatten",
			"blaten",
			"blatend",
		] );
	} );
	it( "return an empty array for a stem that has a non-verb ending", () => {
		expect( addVerbSuffixes( "bakkerij", morphologyDataNL.addSuffixes, morphologyDataNL.verbs ) ).toEqual( [] );
	} );
} );
