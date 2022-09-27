import random

from pymodbus.client.sync import ModbusTcpClient
from time import sleep

voltageRegister = 0
currentRegister = 1

num = 0
wVolts = random.randint(220, 240)
wAmps = random.randint(0, 1000)
client = ModbusTcpClient('modbus', 5020)


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


def generateRndVoltage():
    return random.randint(225, 230)


def generateRndCurrent():
    return random.randint(100, 10000)


while True:
    wVolts = generateRndVoltage()
    wAmps = generateRndCurrent()
    if (num%3==0):
        writeVoltage(wVolts)
    if (num % 4==0):
        writeCurrent(wAmps)

    print("writing voltage:", wVolts, "   ", "reading voltage", readVoltage(client), "  writing current:", wAmps,
          "    reading current:", readCurrent(client))
    num += 1
    sleep(2)
