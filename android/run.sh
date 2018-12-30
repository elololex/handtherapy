#!/bin/bash

./gradlew ${1:-installDevMinSdkDevKernelDebug} --stacktrace && adb shell am start -n com.imagineear.handtherapy/host.exp.exponent.MainActivity
