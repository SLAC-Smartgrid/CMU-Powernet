import json
import time
import math
import requests
import random
import argparse
from random import randint

homehubs_url = 'http://localhost:3000/homehubs/'

homehubs = [{
	"hh_id":1,
    "label": "CMU-SV Building 23",
	"total_power": 123,
	"location": "CMU-SV",
	"callback_url": "www_homehub1_com/callback_url",
	"state":
	{
		"device_1":
		{
			"power": 1,
			"status": "on",
			"type": "Consumer",
			"name": "Fan23"
		},
		"device_2":
		{
			"power": 100,
			"status": "on",
			"type": "Consumer",
			"name": "Light23"
		},
		"device_3":
		{
			"power": 22,
			"status": "on",
			"type": "Generator",
			"name": "Generator23"
		}
	}
},
{
    "hh_id": 2,
	"label": "CMU-SV Building 19",
	"total_power": 119,
	"location": "CMU-SV",
	"callback_url": "www_homehub2_com/callback_url",
	"state":
	{
		"device_119":
		{
			"power": 100,
			"status": "on",
			"type": "Consumer",
			"name": "Fan19"
		},
		"device_219":
		{
			"power": 9,
			"status": "on",
			"type": "Consumer",
			"name": "Light19"
		},
		"device_319":
		{
			"power": 10,
			"status": "on",
			"type": "Generator",
			"name": "Generator19"
		}
	}
},
{
    "hh_id": 3,
	"label": "CIC 1121",
	"total_power": 1121,
	"location": "Pittsburgh",
	"callback_url": "www_homehub3_com/callback_url",
	"state":
	{
		"device_11121":
		{
			"power": 500,
			"status": "on",
			"type": "Consumer",
			"name": "Fan1121"
		},
		"device_21121":
		{
			"power": 600,
			"status": "on",
			"type": "Consumer",
			"name": "Light1121"
		},
		"device_31121":
		{
			"power": 21,
			"status": "on",
			"type": "Generator",
			"name": "Generator1121"
		}
	}
},
{
    "hh_id": 4,
	"label": "SLAC",
	"total_power": 123,
	"location": "Stanford",
	"callback_url": "www_homehub4_com/callback_url",
	"state":
	{
		"device_1":
		{
			"power": 1,
			"status": "on",
			"type": "Consumer",
			"name": "Fan23"
		},
		"device_2":
		{
			"power": 100,
			"status": "on",
			"type": "Consumer",
			"name": "Light23"
		},
		"device_3":
		{
			"power": 22,
			"status": "on",
			"type": "Generator",
			"name": "Generator23"
		}
	}
},
{
    "hh_id": 5,
	"label": "Googleplex",
	"total_power": 123,
	"location": "Mountain View",
	"callback_url": "www_homehub5_com/callback_url",
	"state":
	{
		"device_1":
		{
			"power": 1,
			"status": "on",
			"type": "Consumer",
			"name": "Fan23"
		},
		"device_2":
		{
			"power": 100,
			"status": "on",
			"type": "Consumer",
			"name": "Light23"
		},
		"device_3":
		{
			"power": 22,
			"status": "on",
			"type": "Generator",
			"name": "Generator23"
		}
	}
}]

def laplace(variance):
    rand = random.random()
    if rand < 0.5:
        return variance * math.log(2 * rand)
    else:
        return 0 - variance * math.log(2 * (1 - rand))

def register_home_hubs():
    ids = []
    headers = {'Content-Type':'application/json'}
    for homehub in homehubs:
        r = requests.post(homehubs_url, data=json.dumps(homehub), headers = headers)
        ids.append(json.loads(r.content)['uuid'])

    return ids

def mock_homehub_status(ids):
    variance = 1
    baseline = 300


    while 1:
        consumption = int(baseline + laplace(variance))
        url = homehubs_url + ids[randint(0,len(ids) - 1)]
        payload = {'total_power' : consumption}
        headers = {'Content-Type':'application/json'}
        requests.patch(url, data=json.dumps(payload), headers = headers)

        print 'done sent data -> ' + url + '; ' +str(payload)

        time.sleep(2)

if __name__ == '__main__':


	parser = argparse.ArgumentParser(description=
		'''Register Homehubs to Cloud Coordinator and feed homehub status to CC''')
	parser.add_argument('--ids', help='The uuids of the homehubs, separated by comma)')
	args = parser.parse_args()

	ids = []
	if args.ids:
		ids = args.ids.split(',')
		print 'using existing ids -> ' + str(ids)
	else:
		ids = register_home_hubs()
		print 'Register new Homehubs, and using the generated ids -> ' + str(ids)

	print 'Mock Homehubs status and send to CC'
	mock_homehub_status(ids)
