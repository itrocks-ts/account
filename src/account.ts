import { Representative } from '@itrocks/class-view'
import { Password }       from '@itrocks/password'
import { Required }       from '@itrocks/required'
import { Store }          from '@itrocks/store'

@Representative('login')
@Store()
export class Account
{

	@Required()
	login = ''

	@Password()
	password = ''

}
