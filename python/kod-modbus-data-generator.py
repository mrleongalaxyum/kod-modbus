
import random

from pymodbus.client.sync import ModbusTcpClient
from time import sleep

voltageRegister = 0
currentRegister = 1

num = 0
inc = 0
wVolts = random.randint(200, 240)
wAmps = random.randint(0, 1000)
client = ModbusTcpClient('127.0.0.1', 5020)


def writeVoltage(voltage):
    client.write_register(voltageRegister, voltage)


def writeCurrent(amps):
    client.write_register(currentRegister, amps)


def readVoltage(device):
    reqVoltage = device.read_holding_registers(voltageRegister, 1)
    resultVolt = reqVoltage.registers
    return resultVolt


def readCurrent(device):
    reqCurrent = device.read_holding_registers(currentRegister, 1)
    resultAmps = reqCurrent.registers
    return resultAmps

def generateRndvoltage():
    return random.randint(200,240)

def generateRndcurrent():
    return random.randint(0,10000)


while True:
    wVolts = generateRndvoltage()
    wAmps = generateRndcurrent()

    writeVoltage(wVolts)
    writeCurrent(wAmps)

    print("writing voltage:", wVolts, "   ", "reading voltage", readVoltage(client), "  writing current:", wAmps, "    reading current:",readCurrent(client))
    num += 1
    inc += 1
    sleep(2)
