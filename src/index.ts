/**
 * Test native cloneDeep
 * @param object - object to clone
 * @returns copy
 */
function cloneDeepTest<T>(object: T) {
	return structuredClone(object);
}

export { cloneDeepTest };
