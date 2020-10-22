import {DebugElement, Predicate} from '@angular/core';
import {By} from '@angular/platform-browser';
import {of} from 'rxjs';

export function byTestAttr(attrValue: string): Predicate<DebugElement> {
	return By.css(`[data-test=${attrValue}]`);
}

export function clickByTestAttr(debugElement: DebugElement, testAttr: string): void {
	debugElement.query(byTestAttr(testAttr)).nativeElement.click();
}

export function getSnapShotChanges(data: object, asObserv: boolean): any {
	const dataKeys = Object.keys(data);
	const actions = [];

	for (let i = 0; i < dataKeys.length; i++) {
		actions.push({
			payload: {
				doc: {
					data: function (): any {
						return {...data[dataKeys[i]]};
					}
				},
				exists: true
			}
		});
	}

	if (asObserv) {
		return of(actions);
	} else {
		return actions;
	}
}
