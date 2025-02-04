/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Source EULA. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { strictEqual } from 'assert';
import { getUNCHost } from 'vs/base/node/unc';

suite('UNC', () => {

	test('getUNCHost', () => {

		strictEqual(getUNCHost(undefined), undefined);
		strictEqual(getUNCHost(null), undefined);

		strictEqual(getUNCHost('/'), undefined);
		strictEqual(getUNCHost('/foo'), undefined);

		strictEqual(getUNCHost('c:'), undefined);
		strictEqual(getUNCHost('c:\\'), undefined);
		strictEqual(getUNCHost('c:\\foo'), undefined);
		strictEqual(getUNCHost('c:\\foo\\\\server\\path'), undefined);

		strictEqual(getUNCHost('\\'), undefined);
		strictEqual(getUNCHost('\\\\'), undefined);
		strictEqual(getUNCHost('\\\\localhost'), undefined);

		strictEqual(getUNCHost('\\\\localhost\\'), 'localhost');
		strictEqual(getUNCHost('\\\\localhost\\a'), 'localhost');

		strictEqual(getUNCHost('\\\\.'), undefined);
		strictEqual(getUNCHost('\\\\?'), undefined);

		strictEqual(getUNCHost('\\\\.\\localhost'), '.');
		strictEqual(getUNCHost('\\\\?\\localhost'), '?');

		strictEqual(getUNCHost('\\\\.\\UNC\\localhost'), '.');
		strictEqual(getUNCHost('\\\\?\\UNC\\localhost'), '?');

		strictEqual(getUNCHost('\\\\.\\UNC\\localhost\\'), 'localhost');
		strictEqual(getUNCHost('\\\\?\\UNC\\localhost\\'), 'localhost');

		strictEqual(getUNCHost('\\\\.\\UNC\\localhost\\a'), 'localhost');
		strictEqual(getUNCHost('\\\\?\\UNC\\localhost\\a'), 'localhost');
	});
});
