package com.dailydesk.common.id

import org.apache.commons.lang3.RandomStringUtils

class ShortId( val value: String? = RandomStringUtils.random(12, "0123456789abcdef"))