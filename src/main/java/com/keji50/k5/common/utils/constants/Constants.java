package com.keji50.k5.common.utils.constants;

import com.keji50.k5.common.spring.CustomizedPropertyPlaceholderConfigurer;

/**
 * 常量集合类
 *
 * @author chao.li
 * @version
 * @since Ver 1.1
 * @Date 2015年12月8日 下午4:34:47
 *
 * @see
 */
public class Constants {

    private Constants() {

    }

    /**
     * 用户默认头像
     */
    public final static String DEFAULT_ACCOUNT_IMAGE = CustomizedPropertyPlaceholderConfigurer.getContextProperty("account.default.image");

    public final static String INFO_CATEGORY_ID = "info_category_id";
    
    public final static String INFO_ID = "info_id";
    
    public final static String INFO_OFFSET = "offset";
    
    public final static String AUTHOR_ID = "author_id";
    
    public final static String COMMAND = "d";
    
}
